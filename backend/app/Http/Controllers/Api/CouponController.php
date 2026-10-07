<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    private array $coupons = [
        [
            'code'        => 'CDMEATS20',
            'title'       => '20% OFF',
            'description' => 'Your Entire Order',
            'discount'    => 20,
            'type'        => 'percentage',
            'min_purchase'=> 50,
            'terms'       => 'Valid for first-time customers only. Minimum purchase of ₱50 required.',
        ],
        [
            'code'        => 'CDMBOGO',
            'title'       => 'BUY 1 GET 1',
            'description' => 'On Selected Items',
            'discount'    => 100,
            'type'        => 'bogo',
            'min_purchase'=> 0,
            'terms'       => 'Valid on Pancit Canton and Siomai Rice only. Cannot be combined with other offers.',
        ],
        [
            'code'        => 'CDMDRINK',
            'title'       => 'FREE DRINK',
            'description' => 'With Any Meal',
            'discount'    => 0,
            'type'        => 'free_item',
            'min_purchase'=> 40,
            'terms'       => 'Free regular-sized soft drink with any meal purchase of ₱40 or more.',
        ],
    ];

    /** GET /api/coupons */
    public function index(): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $this->coupons]);
    }

    /** POST /api/coupons/validate */
    public function validate(Request $request): JsonResponse
    {
        $request->validate(['code' => 'required|string']);

        $code   = strtoupper(trim($request->input('code')));
        $coupon = collect($this->coupons)->firstWhere('code', $code);

        if (! $coupon) {
            return response()->json(['success' => false, 'message' => 'Invalid coupon code'], 422);
        }

        return response()->json(['success' => true, 'data' => $coupon]);
    }
}
