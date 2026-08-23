<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ManagerTenantController extends Controller
{
    /**
     * List tenants belonging to the authenticated manager's portfolio.
     */
    public function index(Request $request)
    {
        $manager = $request->user();

        $tenants = Tenant::with([
                'user',
                'flat.apartment',
            ])
            ->whereHas('flat.apartment', function ($query) use ($manager) {
                $query->where('manager_id', $manager->id);
            })
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tenants,
        ]);
    }

    /**
     * Create a tenant on one of the manager's flats.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',
            'flat_id' => 'required|integer|exists:flats,id',
            'move_in_date' => 'required|date',
            'lease_start' => 'required|date',
            'lease_end' => 'required|date|after_or_equal:lease_start',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $manager = $request->user();

        /*
         * Make sure the flat belongs to this manager.
         */
        $flat = Flat::where('id', $request->flat_id)
            ->whereHas('apartment', function ($query) use ($manager) {
                $query->where('manager_id', $manager->id);
            })
            ->first();

        if (!$flat) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to use this flat.',
            ], 403);
        }

        /*
         * A flat can only have one tenant because flat_id
         * is unique in the tenants migration.
         */
        if ($flat->tenant()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'This flat already has a tenant.',
            ], 422);
        }

        /*
         * Only tenant users should be assigned as tenants.
         */
        $tenantUser = User::with('role')->find($request->user_id);

        if (!$tenantUser || $tenantUser->role?->name !== 'tenant') {
            return response()->json([
                'success' => false,
                'message' => 'The selected user is not a tenant.',
            ], 422);
        }

        /*
         * A user should not have multiple tenant records.
         */
        if (Tenant::where('user_id', $tenantUser->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'This user is already assigned to a flat.',
            ], 422);
        }

        $tenant = Tenant::create([
            'user_id' => $tenantUser->id,
            'flat_id' => $flat->id,
            'move_in_date' => $request->move_in_date,
            'lease_start' => $request->lease_start,
            'lease_end' => $request->lease_end,
        ]);

        /*
         * Creating a tenant means the flat is occupied.
         */
        $flat->update([
            'status' => 'occupied',
        ]);

        $tenant->load([
            'user',
            'flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tenant created successfully.',
            'data' => $tenant,
        ], 201);
    }

    /**
     * Show one manager-owned tenant.
     */
    public function show(Request $request, Tenant $tenant)
    {
        if (!$this->ownsTenant($request, $tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this tenant.',
            ], 403);
        }

        $tenant->load([
            'user',
            'flat.apartment',
            'rentPayments',
            'utilityBills',
            'complaints',
        ]);

        return response()->json([
            'success' => true,
            'data' => $tenant,
        ]);
    }

    /**
     * Update a manager-owned tenant.
     */
    public function update(Request $request, Tenant $tenant)
    {
        if (!$this->ownsTenant($request, $tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this tenant.',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'sometimes|required|integer|exists:users,id',
            'flat_id' => 'sometimes|required|integer|exists:flats,id',
            'move_in_date' => 'sometimes|required|date',
            'lease_start' => 'sometimes|required|date',
            'lease_end' => 'sometimes|required|date|after_or_equal:lease_start',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $manager = $request->user();

        /*
         * If changing the flat, make sure the new flat
         * belongs to the same manager.
         */
        if ($request->has('flat_id')) {
            $newFlat = Flat::where('id', $request->flat_id)
                ->whereHas('apartment', function ($query) use ($manager) {
                    $query->where('manager_id', $manager->id);
                })
                ->first();

            if (!$newFlat) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to use this flat.',
                ], 403);
            }

            /*
             * Don't allow moving onto an already occupied flat.
             */
            if (
                $newFlat->id !== $tenant->flat_id &&
                $newFlat->tenant()->exists()
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'The selected flat already has a tenant.',
                ], 422);
            }
        }

        /*
         * If changing the user, ensure they are a tenant
         * and aren't already assigned elsewhere.
         */
        if ($request->has('user_id')) {
            $newUser = User::with('role')->find($request->user_id);

            if (!$newUser || $newUser->role?->name !== 'tenant') {
                return response()->json([
                    'success' => false,
                    'message' => 'The selected user is not a tenant.',
                ], 422);
            }

            $existingTenant = Tenant::where('user_id', $newUser->id)
                ->where('id', '!=', $tenant->id)
                ->exists();

            if ($existingTenant) {
                return response()->json([
                    'success' => false,
                    'message' => 'This user is already assigned to a flat.',
                ], 422);
            }
        }

        $oldFlatId = $tenant->flat_id;

        $tenant->update($request->only([
            'user_id',
            'flat_id',
            'move_in_date',
            'lease_start',
            'lease_end',
        ]));

        /*
         * Keep flat occupancy status synchronized.
         */
        if ($request->has('flat_id') && $request->flat_id != $oldFlatId) {
            Flat::where('id', $oldFlatId)->update([
                'status' => 'vacant',
            ]);

            Flat::where('id', $request->flat_id)->update([
                'status' => 'occupied',
            ]);
        }

        $tenant->load([
            'user',
            'flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tenant updated successfully.',
            'data' => $tenant,
        ]);
    }

    /**
     * Delete a manager-owned tenant.
     */
    public function destroy(Request $request, Tenant $tenant)
    {
        if (!$this->ownsTenant($request, $tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this tenant.',
            ], 403);
        }

        $flat = $tenant->flat;

        /*
         * Delete related records first so we don't leave
         * orphaned tenant data.
         */
        $tenant->rentPayments()->delete();
        $tenant->utilityBills()->delete();

        /*
         * Complaints may have maintenance requests.
         */
        foreach ($tenant->complaints as $complaint) {
            $complaint->maintenanceRequests()->delete();
            $complaint->delete();
        }

        $tenant->delete();

        /*
         * Once the tenant is removed, the flat becomes vacant.
         */
        if ($flat) {
            $flat->update([
                'status' => 'vacant',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Tenant deleted successfully.',
        ]);
    }

    /**
     * Verify that the tenant belongs to the authenticated manager.
     */
    private function ownsTenant(Request $request, Tenant $tenant): bool
    {
        return $tenant->flat()
            ->whereHas('apartment', function ($query) use ($request) {
                $query->where('manager_id', $request->user()->id);
            })
            ->exists();
    }
}