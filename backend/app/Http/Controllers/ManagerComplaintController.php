<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ManagerComplaintController extends Controller
{
    /**
     * Display all complaints belonging to tenants
     * managed by the authenticated manager.
     */
    public function index(Request $request)
    {
        $managerId = $request->user()->id;

        $complaints = Complaint::with([
            'tenant.user',
            'tenant.flat.apartment',
        ])
            ->whereHas('tenant.flat.apartment', function ($query) use ($managerId) {
                $query->where('manager_id', $managerId);
            })
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $complaints,
        ]);
    }

    /**
     * Store a new complaint.
     */
    public function store(Request $request)
    {
        $managerId = $request->user()->id;

        $validated = $request->validate([
            'tenant_id' => [
                'required',
                'integer',
                'exists:tenants,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'status' => [
                'required',
                Rule::in([
                    'open',
                    'in_progress',
                    'resolved',
                ]),
            ],
        ]);

        /*
         * Make sure the tenant belongs to an apartment
         * managed by the authenticated manager.
         */
        $tenant = Tenant::with('flat.apartment')
            ->findOrFail($validated['tenant_id']);

        if (
            !$tenant->flat ||
            !$tenant->flat->apartment ||
            $tenant->flat->apartment->manager_id !== $managerId
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant does not belong to your portfolio.',
            ], 404);
        }

        $complaint = Complaint::create($validated);

        $complaint->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Complaint created successfully.',
            'data' => $complaint,
        ], 201);
    }

    /**
     * Display one complaint.
     */
    public function show(
        Request $request,
        Complaint $complaint
    ) {
        $this->authorizeComplaint($request, $complaint);

        $complaint->load([
            'tenant.user',
            'tenant.flat.apartment',
            'maintenanceRequests',
        ]);

        return response()->json([
            'success' => true,
            'data' => $complaint,
        ]);
    }

    /**
     * Update a complaint.
     */
    public function update(
        Request $request,
        Complaint $complaint
    ) {
        $this->authorizeComplaint($request, $complaint);

        $managerId = $request->user()->id;

        $validated = $request->validate([
            'tenant_id' => [
                'sometimes',
                'integer',
                'exists:tenants,id',
            ],

            'title' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'description' => [
                'sometimes',
                'string',
            ],

            'status' => [
                'sometimes',
                Rule::in([
                    'open',
                    'in_progress',
                    'resolved',
                ]),
            ],
        ]);

        /*
         * If tenant_id is changed, make sure the new tenant
         * also belongs to this manager.
         */
        if (isset($validated['tenant_id'])) {
            $tenant = Tenant::with('flat.apartment')
                ->findOrFail($validated['tenant_id']);

            if (
                !$tenant->flat ||
                !$tenant->flat->apartment ||
                $tenant->flat->apartment->manager_id !== $managerId
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tenant does not belong to your portfolio.',
                ], 404);
            }
        }

        $complaint->update($validated);

        $complaint->load([
            'tenant.user',
            'tenant.flat.apartment',
            'maintenanceRequests',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Complaint updated successfully.',
            'data' => $complaint,
        ]);
    }

    /**
     * Delete a complaint.
     */
    public function destroy(
        Request $request,
        Complaint $complaint
    ) {
        $this->authorizeComplaint($request, $complaint);

        $complaint->delete();

        return response()->json([
            'success' => true,
            'message' => 'Complaint deleted successfully.',
        ]);
    }

    /**
     * Make sure the complaint belongs to the
     * authenticated manager's portfolio.
     */
    private function authorizeComplaint(
        Request $request,
        Complaint $complaint
    ): void {
        $managerId = $request->user()->id;

        $complaint->loadMissing(
            'tenant.flat.apartment'
        );

        $tenant = $complaint->tenant;

        if (
            !$tenant ||
            !$tenant->flat ||
            !$tenant->flat->apartment ||
            $tenant->flat->apartment->manager_id !== $managerId
        ) {
            abort(response()->json([
                'success' => false,
                'message' => 'Complaint not found.',
            ], 404));
        }
    }
}