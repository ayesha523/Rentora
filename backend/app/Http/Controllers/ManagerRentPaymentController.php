<?php

namespace App\Http\Controllers;

use App\Models\RentPayment;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ManagerRentPaymentController extends Controller
{
    /**
     * Display all rent payments belonging to tenants
     * managed by the authenticated manager.
     */
    public function index(Request $request)
    {
        $managerId = $request->user()->id;

        $payments = RentPayment::with([
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
            'data' => $payments,
        ]);
    }

    /**
     * Store a new rent payment.
     */
    public function store(Request $request)
    {
        $managerId = $request->user()->id;

        // Validate the submitted data.
        $validated = $request->validate([
            'tenant_id' => 'required|integer|exists:tenants,id',

            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'payment_date' => [
                'required',
                'date',
            ],

            'status' => [
                'required',
                Rule::in(['paid', 'pending']),
            ],
        ]);

        /*
         * Make sure the tenant belongs to an apartment
         * managed by the currently logged-in manager.
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

        // Create the payment.
        $payment = RentPayment::create($validated);

        // Load related information for the response.
        $payment->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rent payment created successfully.',
            'data' => $payment,
        ], 201);
    }

    /**
     * Display one rent payment.
     */
    public function show(
        Request $request,
        RentPayment $rentPayment
    ) {
        $this->authorizePayment($request, $rentPayment);

        $rentPayment->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'data' => $rentPayment,
        ]);
    }

    /**
     * Update a rent payment.
     */
    public function update(
        Request $request,
        RentPayment $rentPayment
    ) {
        $this->authorizePayment($request, $rentPayment);

        $managerId = $request->user()->id;

        $validated = $request->validate([
            'tenant_id' => 'sometimes|integer|exists:tenants,id',

            'amount' => [
                'sometimes',
                'numeric',
                'min:0',
            ],

            'payment_date' => [
                'sometimes',
                'date',
            ],

            'status' => [
                'sometimes',
                Rule::in(['paid', 'pending']),
            ],
        ]);

        /*
         * If the tenant is being changed, make sure
         * the new tenant also belongs to this manager.
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

        // Update the payment.
        $rentPayment->update($validated);

        $rentPayment->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rent payment updated successfully.',
            'data' => $rentPayment,
        ]);
    }

    /**
     * Delete a rent payment.
     */
    public function destroy(
        Request $request,
        RentPayment $rentPayment
    ) {
        $this->authorizePayment($request, $rentPayment);

        $rentPayment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rent payment deleted successfully.',
        ]);
    }

    /**
     * Make sure a payment belongs to the authenticated manager.
     */
    private function authorizePayment(
        Request $request,
        RentPayment $rentPayment
    ): void {
        $managerId = $request->user()->id;

        /*
         * Load the ownership chain:
         *
         * RentPayment
         *      ↓
         * Tenant
         *      ↓
         * Flat
         *      ↓
         * Apartment
         *      ↓
         * Manager
         */
        $rentPayment->loadMissing(
            'tenant.flat.apartment'
        );

        $tenant = $rentPayment->tenant;

        if (
            !$tenant ||
            !$tenant->flat ||
            !$tenant->flat->apartment ||
            $tenant->flat->apartment->manager_id !== $managerId
        ) {
            abort(response()->json([
                'success' => false,
                'message' => 'Rent payment not found.',
            ], 404));
        }
    }
}