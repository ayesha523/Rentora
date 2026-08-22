<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\UtilityBill;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ManagerUtilityBillController extends Controller
{
    /**
     * Display all utility bills belonging to tenants
     * managed by the authenticated manager.
     */
    public function index(Request $request)
    {
        $managerId = $request->user()->id;

        $bills = UtilityBill::with([
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
            'data' => $bills,
        ]);
    }

    /**
     * Store a new utility bill.
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

            'type' => [
                'required',
                'string',
                'max:100',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'billing_month' => [
                'required',
                'string',
                'max:20',
            ],

            'status' => [
                'required',
                Rule::in(['paid', 'unpaid']),
            ],
        ]);

        /*
         * Make sure the tenant belongs to an apartment
         * managed by the currently authenticated manager.
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

        $bill = UtilityBill::create($validated);

        $bill->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Utility bill created successfully.',
            'data' => $bill,
        ], 201);
    }

    /**
     * Display one utility bill.
     */
    public function show(
        Request $request,
        UtilityBill $utilityBill
    ) {
        $this->authorizeBill($request, $utilityBill);

        $utilityBill->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'data' => $utilityBill,
        ]);
    }

    /**
     * Update a utility bill.
     */
    public function update(
        Request $request,
        UtilityBill $utilityBill
    ) {
        $this->authorizeBill($request, $utilityBill);

        $managerId = $request->user()->id;

        $validated = $request->validate([
            'tenant_id' => [
                'sometimes',
                'integer',
                'exists:tenants,id',
            ],

            'type' => [
                'sometimes',
                'string',
                'max:100',
            ],

            'amount' => [
                'sometimes',
                'numeric',
                'min:0',
            ],

            'billing_month' => [
                'sometimes',
                'string',
                'max:20',
            ],

            'status' => [
                'sometimes',
                Rule::in(['paid', 'unpaid']),
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

        $utilityBill->update($validated);

        $utilityBill->load([
            'tenant.user',
            'tenant.flat.apartment',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Utility bill updated successfully.',
            'data' => $utilityBill,
        ]);
    }

    /**
     * Delete a utility bill.
     */
    public function destroy(
        Request $request,
        UtilityBill $utilityBill
    ) {
        $this->authorizeBill($request, $utilityBill);

        $utilityBill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Utility bill deleted successfully.',
        ]);
    }

    /**
     * Make sure the utility bill belongs to the
     * authenticated manager's portfolio.
     */
    private function authorizeBill(
        Request $request,
        UtilityBill $utilityBill
    ): void {
        $managerId = $request->user()->id;

        $utilityBill->loadMissing(
            'tenant.flat.apartment'
        );

        $tenant = $utilityBill->tenant;

        if (
            !$tenant ||
            !$tenant->flat ||
            !$tenant->flat->apartment ||
            $tenant->flat->apartment->manager_id !== $managerId
        ) {
            abort(response()->json([
                'success' => false,
                'message' => 'Utility bill not found.',
            ], 404));
        }
    }
}