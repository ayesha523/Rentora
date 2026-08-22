<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        RateLimiter::for('forgot-password', function (Request $request) {
            return Limit::perMinute(5)->by(
                $request->ip() . '|' . strtolower((string) $request->input('email'))
            );
        });

        RateLimiter::for('reset-password', function (Request $request) {
            return Limit::perMinute(5)->by(
                $request->ip()
            );
        });
    }
}