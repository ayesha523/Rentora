<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ManagerApartmentController extends Controller
{
    /**
     * List apartments owned by the authenticated manager.
     */
    public function index(Request $request): JsonResponse
    {
        $apartments = Apartment::query()
            ->where('manager_id', $request->user()->id)
            ->withCount('flats')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $apartments,
        ]);
    }

    /**
     * Create an apartment for the authenticated manager.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        $apartment = Apartment::create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'manager_id' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Apartment created successfully.',
            'data' => $apartment->loadCount('flats'),
        ], 201);
    }

    /**
     * Show one apartment belonging to the authenticated manager.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $apartment = $this->findOwnedApartment(
            $request->user()->id,
            $id
        );

        return response()->json([
            'success' => true,
            'data' => $apartment->load('flats'),
        ]);
    }

    /**
     * Update an apartment belonging to the authenticated manager.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $apartment = $this->findOwnedApartment(
            $request->user()->id,
            $id
        );

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'address' => ['sometimes', 'required', 'string', 'max:255'],
        ]);

        $apartment->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Apartment updated successfully.',
            'data' => $apartment->fresh()->loadCount('flats'),
        ]);
    }

    /**
     * Delete an apartment belonging to the authenticated manager.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $apartment = $this->findOwnedApartment(
            $request->user()->id,
            $id
        );

        $apartment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Apartment deleted successfully.',
        ]);
    }

    /**
     * Find an apartment belonging to the specified manager.
     *
     * A manager cannot access another manager's apartment.
     */
    private function findOwnedApartment(int $managerId, int $apartmentId): Apartment
    {
        return Apartment::query()
            ->where('manager_id', $managerId)
            ->findOrFail($apartmentId);
    }
}