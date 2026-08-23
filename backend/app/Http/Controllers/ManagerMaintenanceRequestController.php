<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\MaintenanceRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ManagerMaintenanceRequestController extends Controller
{
    /**
     * Display all maintenance requests belonging
     * to the authenticated manager's portfolio.
     */
    public function index(Request $request)
    {
        $managerId = $request->user()->id;

        $requests = MaintenanceRequest::with([
            'complaint.tenant.user',
            'complaint.tenant.flat.apartment',
            'assignedUser',
        ])
            ->whereHas(
                'complaint.tenant.flat.apartment',
                function ($query) use ($managerId) {
                    $query->where('manager_id', $managerId);
                }
            )
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $requests,
        ]);
    }

    /**
     * Store a new maintenance request.
     */
    public function store(Request $request)
    {
        $managerId = $request->user()->id;

        $validated = $request->validate([
            'complaint_id' => [
                'required',
                'integer',
                'exists:complaints,id',
            ],

            'assigned_to' => [
                'nullable',
                'integer',
                'exists:users,id',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],

            'status' => [
                'required',
                Rule::in([
                    'pending',
                    'in_progress',
                    'completed',
                ]),
            ],
        ]);

        /*
         * Make sure the complaint belongs to a tenant
         * in an apartment managed by this manager.
         */
        $complaint = Complaint::with(
            'tenant.flat.apartment'
        )->findOrFail($validated['complaint_id']);

        if (
            !$complaint->tenant ||
            !$complaint->tenant->flat ||
            !$complaint->tenant->flat->apartment ||
            $complaint->tenant->flat->apartment->manager_id !== $managerId
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint does not belong to your portfolio.',
            ], 404);
        }

        $maintenanceRequest = MaintenanceRequest::create($validated);

        $maintenanceRequest->load([
            'complaint.tenant.user',
            'complaint.tenant.flat.apartment',
            'assignedUser',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Maintenance request created successfully.',
            'data' => $maintenanceRequest,
        ], 201);
    }

    /**
     * Display one maintenance request.
     */
    public function show(
        Request $request,
        MaintenanceRequest $maintenanceRequest
    ) {
        $this->authorizeMaintenanceRequest(
            $request,
            $maintenanceRequest
        );

        $maintenanceRequest->load([
            'complaint.tenant.user',
            'complaint.tenant.flat.apartment',
            'assignedUser',
        ]);

        return response()->json([
            'success' => true,
            'data' => $maintenanceRequest,
        ]);
    }

    /**
     * Update a maintenance request.
     */
    public function update(
        Request $request,
        MaintenanceRequest $maintenanceRequest
    ) {
        $this->authorizeMaintenanceRequest(
            $request,
            $maintenanceRequest
        );

        $validated = $request->validate([
            'complaint_id' => [
                'sometimes',
                'integer',
                'exists:complaints,id',
            ],

            'assigned_to' => [
                'nullable',
                'integer',
                'exists:users,id',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],

            'status' => [
                'sometimes',
                Rule::in([
                    'pending',
                    'in_progress',
                    'completed',
                ]),
            ],
        ]);

        /*
         * If complaint_id is changed, verify that the
         * new complaint also belongs to this manager.
         */
        if (isset($validated['complaint_id'])) {
            $managerId = $request->user()->id;

            $complaint = Complaint::with(
                'tenant.flat.apartment'
            )->findOrFail($validated['complaint_id']);

            if (
                !$complaint->tenant ||
                !$complaint->tenant->flat ||
                !$complaint->tenant->flat->apartment ||
                $complaint->tenant->flat->apartment->manager_id !== $managerId
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Complaint does not belong to your portfolio.',
                ], 404);
            }
        }

        $maintenanceRequest->update($validated);

        $maintenanceRequest->load([
            'complaint.tenant.user',
            'complaint.tenant.flat.apartment',
            'assignedUser',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Maintenance request updated successfully.',
            'data' => $maintenanceRequest,
        ]);
    }

    /**
     * Delete a maintenance request.
     */
    public function destroy(
        Request $request,
        MaintenanceRequest $maintenanceRequest
    ) {
        $this->authorizeMaintenanceRequest(
            $request,
            $maintenanceRequest
        );

        $maintenanceRequest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Maintenance request deleted successfully.',
        ]);
    }

    /**
     * Make sure the maintenance request belongs
     * to the authenticated manager's portfolio.
     */
    private function authorizeMaintenanceRequest(
        Request $request,
        MaintenanceRequest $maintenanceRequest
    ): void {
        $managerId = $request->user()->id;

        $maintenanceRequest->loadMissing(
            'complaint.tenant.flat.apartment'
        );

        $complaint = $maintenanceRequest->complaint;

        if (
            !$complaint ||
            !$complaint->tenant ||
            !$complaint->tenant->flat ||
            !$complaint->tenant->flat->apartment ||
            $complaint->tenant->flat->apartment->manager_id !== $managerId
        ) {
            abort(response()->json([
                'success' => false,
                'message' => 'Maintenance request not found.',
            ], 404));
        }
    }
}