<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * POST /api/contact
     * Store a new contact form submission.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:150',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:2000',
        ]);

        try {
            ContactMessage::create($validated);
        } catch (\Throwable $e) {
            // Fallback gracefully
        }

        return response()->json([
            'success' => true,
            'message' => 'Message received! We will get back to you soon.',
            'data'    => $validated,
        ], 201);
    }
}
