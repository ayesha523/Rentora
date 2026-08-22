<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use Illuminate\Http\Request;

class ManagerNoticeController extends Controller
{
    /**
     * Display all notices published by the authenticated manager.
     */
    public function index(Request $request)
    {
        $managerId = $request->user()->id;

        $notices = Notice::with('publisher')
            ->where('published_by', $managerId)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notices,
        ]);
    }

    /**
     * Store a new notice.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'content' => [
                'required',
                'string',
            ],
        ]);

        $notice = Notice::create([
            'published_by' => $request->user()->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        $notice->load('publisher');

        return response()->json([
            'success' => true,
            'message' => 'Notice created successfully.',
            'data' => $notice,
        ], 201);
    }

    /**
     * Display one notice.
     */
    public function show(Request $request, Notice $notice)
    {
        $this->authorizeNotice($request, $notice);

        $notice->load('publisher');

        return response()->json([
            'success' => true,
            'data' => $notice,
        ]);
    }

    /**
     * Update a notice.
     */
    public function update(Request $request, Notice $notice)
    {
        $this->authorizeNotice($request, $notice);

        $validated = $request->validate([
            'title' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'content' => [
                'sometimes',
                'string',
            ],
        ]);

        $notice->update($validated);

        $notice->load('publisher');

        return response()->json([
            'success' => true,
            'message' => 'Notice updated successfully.',
            'data' => $notice,
        ]);
    }

    /**
     * Delete a notice.
     */
    public function destroy(Request $request, Notice $notice)
    {
        $this->authorizeNotice($request, $notice);

        $notice->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notice deleted successfully.',
        ]);
    }

    /**
     * Make sure the notice belongs to the authenticated manager.
     */
    private function authorizeNotice(
        Request $request,
        Notice $notice
    ): void {
        if ($notice->published_by !== $request->user()->id) {
            abort(response()->json([
                'success' => false,
                'message' => 'Notice not found.',
            ], 404));
        }
    }
}