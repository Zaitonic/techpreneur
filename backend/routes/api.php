<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CouponController;

/*
|--------------------------------------------------------------------------
| API Routes - CDM Eats Backend
|--------------------------------------------------------------------------
*/

// Menu Items
Route::get('/menu',           [MenuController::class, 'index']);
Route::get('/menu/{id}',      [MenuController::class, 'show']);

// Reviews
Route::get('/reviews/{foodId}',  [ReviewController::class, 'index']);
Route::post('/reviews',          [ReviewController::class, 'store']);

// Coupons
Route::get('/coupons',           [CouponController::class, 'index']);
Route::post('/coupons/validate', [CouponController::class, 'validate']);

// Contact
Route::post('/contact',          [ContactController::class, 'store']);
