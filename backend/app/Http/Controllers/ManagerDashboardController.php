<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\RentPayment;
use App\Models\Complaint;
use App\Models\MaintenanceRequest;
use Illuminate\Http\Request;

class ManagerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $manager = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Flats
        |--------------------------------------------------------------------------
        */

        $flats = Flat::whereHas('apartment', function ($query) use ($manager) {
            $query->where('manager_id', $manager->id);
        })->get();

        $totalFlats = $flats->count();

        $occupiedFlats = $flats
            ->where('status', 'occupied')
            ->count();

        $vacantFlats = $flats
            ->where('status', 'vacant')
            ->count();

        $occupancyPercentage = $totalFlats > 0
            ? round(($occupiedFlats / $totalFlats) * 100, 2)
            : 0;

        $expectedMonthlyRent = $flats->sum('rent_amount');

        /*
        |--------------------------------------------------------------------------
        | Apartments
        |--------------------------------------------------------------------------
        */

        $totalApartments = $manager->apartments()->count();

        $featuredProperty = $manager->apartments()
            ->withCount('flats')
            ->latest()
            ->first();

        /*
        |--------------------------------------------------------------------------
        | Rent Payments
        |--------------------------------------------------------------------------
        */

        $pendingPayments = RentPayment::whereHas(
            'tenant.flat.apartment',
            function ($query) use ($manager) {
                $query->where('manager_id', $manager->id);
            }
        )
            ->where('status', 'pending')
            ->count();

        /*
        |--------------------------------------------------------------------------
        | Overdue Payments
        |--------------------------------------------------------------------------
        |
        | A payment is considered overdue when:
        | - it belongs to this manager
        | - its status is pending
        | - its payment date is before today
        |
        */

        $overduePayments = RentPayment::whereHas(
            'tenant.flat.apartment',
            function ($query) use ($manager) {
                $query->where('manager_id', $manager->id);
            }
        )
            ->where('status', 'pending')
            ->whereDate('payment_date', '<', now()->toDateString())
            ->count();

        /*
        |--------------------------------------------------------------------------
        | Complaints
        |--------------------------------------------------------------------------
        */

        $openComplaints = Complaint::whereHas(
            'tenant.flat.apartment',
            function ($query) use ($manager) {
                $query->where('manager_id', $manager->id);
            }
        )
            ->whereIn('status', ['open', 'in_progress'])
            ->count();

        /*
        |--------------------------------------------------------------------------
        | Maintenance Requests
        |--------------------------------------------------------------------------
        */

        $activeMaintenanceRequests = MaintenanceRequest::whereHas(
            'complaint.tenant.flat.apartment',
            function ($query) use ($manager) {
                $query->where('manager_id', $manager->id);
            }
        )
            ->whereIn('status', ['pending', 'in_progress'])
            ->count();

        /*
        |--------------------------------------------------------------------------
        | Items Requiring Attention
        |--------------------------------------------------------------------------
        */

        $itemsRequiringAttention = [];

        if ($pendingPayments > 0) {
            $itemsRequiringAttention[] = [
                'type' => 'payment',
                'message' => $pendingPayments . ' rent payment(s) pending',
                'count' => $pendingPayments,
            ];
        }

        if ($overduePayments > 0) {
            $itemsRequiringAttention[] = [
                'type' => 'overdue_payment',
                'message' => $overduePayments . ' rent payment(s) overdue',
                'count' => $overduePayments,
            ];
        }

        if ($openComplaints > 0) {
            $itemsRequiringAttention[] = [
                'type' => 'complaint',
                'message' => $openComplaints . ' complaint(s) require attention',
                'count' => $openComplaints,
            ];
        }

        if ($activeMaintenanceRequests > 0) {
            $itemsRequiringAttention[] = [
                'type' => 'maintenance',
                'message' => $activeMaintenanceRequests . ' maintenance request(s) active',
                'count' => $activeMaintenanceRequests,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,

            'data' => [
                'total_apartments' => $totalApartments,

                'total_flats' => $totalFlats,

                'occupied_flats' => $occupiedFlats,

                'vacant_flats' => $vacantFlats,

                'occupancy_percentage' => $occupancyPercentage,

                'expected_monthly_rent' => (float) $expectedMonthlyRent,

                'pending_payments' => $pendingPayments,

                'overdue_payments' => $overduePayments,

                'open_complaints' => $openComplaints,

                'active_maintenance_requests' => $activeMaintenanceRequests,

                'featured_property' => $featuredProperty
                    ? [
                        'id' => $featuredProperty->id,
                        'name' => $featuredProperty->name,
                        'address' => $featuredProperty->address,
                        'flat_count' => $featuredProperty->flats_count,
                    ]
                    : null,

                'items_requiring_attention' => $itemsRequiringAttention,
            ],
        ]);
    }
}