<?php

namespace App\Services;

use App\Models\Apartment;
use App\Models\Complaint;
use App\Models\MaintenanceRequest;
use App\Models\RentPayment;
use Illuminate\Support\Collection;

class ManagerDashboardService
{
    /**
     * Build the dashboard data for the authenticated manager.
     */
    public function getDashboard(int $managerId): array
    {
        $apartments = Apartment::query()
            ->where('manager_id', $managerId)
            ->with('flats')
            ->get();

        $flats = $apartments->flatMap->flats;

        $totalApartments = $apartments->count();
        $totalFlats = $flats->count();

        $occupiedFlats = $flats->where('status', 'occupied')->count();
        $vacantFlats = $flats->where('status', 'vacant')->count();

        $occupancyPercentage = $totalFlats > 0
            ? round(($occupiedFlats / $totalFlats) * 100, 2)
            : 0;

        $expectedMonthlyRent = $flats
            ->where('status', 'occupied')
            ->sum('rent_amount');

        $pendingPayments = RentPayment::query()
            ->where('status', 'pending')
            ->whereHas('tenant.flat.apartment', function ($query) use ($managerId) {
                $query->where('manager_id', $managerId);
            })
            ->count();

        $openComplaints = Complaint::query()
            ->where('status', 'open')
            ->whereHas('tenant.flat.apartment', function ($query) use ($managerId) {
                $query->where('manager_id', $managerId);
            })
            ->count();

        $activeMaintenanceRequests = MaintenanceRequest::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->whereHas('complaint.tenant.flat.apartment', function ($query) use ($managerId) {
                $query->where('manager_id', $managerId);
            })
            ->count();

        $featuredProperty = $apartments
            ->sortByDesc('created_at')
            ->first();

        $itemsRequiringAttention = $this->getItemsRequiringAttention(
            $managerId,
            $pendingPayments,
            $openComplaints,
            $activeMaintenanceRequests
        );

        return [
            'total_apartments' => $totalApartments,
            'total_flats' => $totalFlats,
            'occupied_flats' => $occupiedFlats,
            'vacant_flats' => $vacantFlats,
            'occupancy_percentage' => $occupancyPercentage,
            'expected_monthly_rent' => round((float) $expectedMonthlyRent, 2),
            'pending_payments' => $pendingPayments,
            'overdue_payments' => 0,
            'open_complaints' => $openComplaints,
            'active_maintenance_requests' => $activeMaintenanceRequests,
            'featured_property' => $featuredProperty
                ? [
                    'id' => $featuredProperty->id,
                    'name' => $featuredProperty->name,
                    'address' => $featuredProperty->address,
                    'flat_count' => $featuredProperty->flats->count(),
                ]
                : null,
            'items_requiring_attention' => $itemsRequiringAttention,
        ];
    }

    /**
     * Return dashboard items that need manager attention.
     */
    private function getItemsRequiringAttention(
        int $managerId,
        int $pendingPayments,
        int $openComplaints,
        int $activeMaintenanceRequests
    ): array {
        $items = [];

        if ($pendingPayments > 0) {
            $items[] = [
                'type' => 'pending_payments',
                'count' => $pendingPayments,
                'message' => "{$pendingPayments} rent payment(s) pending.",
            ];
        }

        if ($openComplaints > 0) {
            $items[] = [
                'type' => 'open_complaints',
                'count' => $openComplaints,
                'message' => "{$openComplaints} complaint(s) are open.",
            ];
        }

        if ($activeMaintenanceRequests > 0) {
            $items[] = [
                'type' => 'maintenance_requests',
                'count' => $activeMaintenanceRequests,
                'message' => "{$activeMaintenanceRequests} maintenance request(s) require attention.",
            ];
        }

        return $items;
    }
}