<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Rentora Backend API Working'
    ]);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| These routes do not require authentication.
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Password Recovery Routes
|--------------------------------------------------------------------------
|
| These routes do not require authentication.
|
*/

Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
    ->middleware('throttle:forgot-password');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('throttle:reset-password');

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
|
| These routes require a valid Sanctum token.
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', [AuthController::class, 'user']);

});