<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    private array $defaultItems = [
        [
            'id'          => 'silog',
            'name'        => 'CDMSilog',
            'description' => 'Garlic rice, egg, and your choice of protein - a Filipino breakfast favorite any time of day',
            'price'       => 30,
            'original'    => 45,
            'image'       => 'SILOG.jpg',
            'rating'      => 4.7,
            'badges'      => ['Student Favorite', 'On Sale'],
            'category'    => 'Filipino',
        ],
        [
            'id'          => 'pancit',
            'name'        => 'Pancit Canton',
            'description' => 'Stir-fried noodles with vegetables and your choice of meat or seafood',
            'price'       => 25,
            'original'    => 35,
            'image'       => 'CANTON.jpg',
            'rating'      => 4.3,
            'badges'      => ['Student Favorite', '15% OFF'],
            'category'    => 'Filipino',
        ],
        [
            'id'          => 'kbop',
            'name'        => 'K-Bop Bwol',
            'description' => 'Korean-style rice bowl with your choice of protein, vegetables, and signature sauce',
            'price'       => 35,
            'original'    => 50,
            'image'       => 'KOREAN.jpg',
            'rating'      => 4.6,
            'badges'      => ['On Sale'],
            'category'    => 'Korean',
        ],
        [
            'id'          => 'siomai',
            'name'        => 'Siomai Rice',
            'description' => 'Steamed pork and shrimp dumplings served with garlic rice and soy-vinegar sauce',
            'price'       => 20,
            'original'    => null,
            'image'       => 'SIOMAI.jpg',
            'rating'      => 4.4,
            'badges'      => ['Student Favorite'],
            'category'    => 'Chinese',
        ],
    ];

    /** GET /api/menu */
    public function index(): JsonResponse
    {
        try {
            $dbItems = MenuItem::where('is_active', true)->get();
            if ($dbItems->isNotEmpty()) {
                $formatted = $dbItems->map(function ($item) {
                    $badges = [];
                    if ($item->original_price && $item->original_price > $item->price) {
                        $badges[] = 'On Sale';
                    }
                    if ($item->rating >= 4.4) {
                        $badges[] = 'Student Favorite';
                    }
                    return [
                        'id'          => $item->slug,
                        'name'        => $item->name,
                        'description' => $item->description,
                        'price'       => (float) $item->price,
                        'original'    => $item->original_price ? (float) $item->original_price : null,
                        'image'       => $item->image,
                        'rating'      => (float) $item->rating,
                        'badges'      => $badges,
                        'category'    => $item->category,
                    ];
                });
                return response()->json([
                    'success' => true,
                    'data'    => $formatted,
                ]);
            }
        } catch (\Throwable $e) {
            // Fallback to static items if DB not accessible
        }

        return response()->json([
            'success' => true,
            'data'    => $this->defaultItems,
        ]);
    }

    /** GET /api/menu/{id} */
    public function show(string $id): JsonResponse
    {
        try {
            $item = MenuItem::where('slug', $id)->first();
            if ($item) {
                return response()->json([
                    'success' => true,
                    'data'    => [
                        'id'          => $item->slug,
                        'name'        => $item->name,
                        'description' => $item->description,
                        'price'       => (float) $item->price,
                        'original'    => $item->original_price ? (float) $item->original_price : null,
                        'image'       => $item->image,
                        'rating'      => (float) $item->rating,
                        'badges'      => ['Student Favorite'],
                        'category'    => $item->category,
                    ],
                ]);
            }
        } catch (\Throwable $e) {
            // Fallback
        }

        $item = collect($this->defaultItems)->firstWhere('id', $id);

        if (! $item) {
            return response()->json(['success' => false, 'message' => 'Item not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $item]);
    }
}
