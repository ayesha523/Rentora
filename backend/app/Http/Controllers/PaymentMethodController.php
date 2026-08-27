<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\StripePaymentMethodService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Stripe\Exception\ApiErrorException;
use Throwable;

class PaymentMethodController extends Controller
{
    public function __construct(
        private StripePaymentMethodService $stripePaymentMethodService
    ) {
    }

    /**
     * Create a Stripe SetupIntent for the authenticated tenant.
     */
    public function createSetupIntent(Request $request): JsonResponse
    {
        $tenant = $request->user();

        if (!$this->isTenant($tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'Only tenants can manage payment methods.',
            ], 403);
        }

        try {
            $setupIntent = $this->stripePaymentMethodService
                ->createSetupIntent($tenant);

            return response()->json([
                'success' => true,
                'message' => 'Setup intent created successfully.',
                'data' => [
                    'client_secret' => $setupIntent->client_secret,
                ],
            ]);
        } catch (ApiErrorException $e) {
            return $this->stripeErrorResponse($e);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Unable to create setup intent.',
            ], 500);
        }
    }

    /**
     * List the authenticated tenant's saved payment methods.
     */
    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user();

        if (!$this->isTenant($tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'Only tenants can manage payment methods.',
            ], 403);
        }

        try {
            $paymentMethods = $this->stripePaymentMethodService
                ->getPaymentMethods($tenant);

            return response()->json([
                'success' => true,
                'message' => 'Payment methods retrieved successfully.',
                'data' => $paymentMethods,
            ]);
        } catch (ApiErrorException $e) {
            return $this->stripeErrorResponse($e);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Unable to retrieve payment methods.',
            ], 500);
        }
    }

    /**
     * Set a payment method as the tenant's default.
     */
    public function setDefault(
        Request $request,
        string $paymentMethod
    ): JsonResponse {
        $tenant = $request->user();

        if (!$this->isTenant($tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'Only tenants can manage payment methods.',
            ], 403);
        }

        try {
            $this->stripePaymentMethodService
                ->setDefaultPaymentMethod($tenant, $paymentMethod);

            return response()->json([
                'success' => true,
                'message' => 'Default payment method updated successfully.',
            ]);
        } catch (ApiErrorException $e) {
            return $this->stripeErrorResponse($e);
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getStatusCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Unable to update the default payment method.',
            ], 500);
        }
    }

    /**
     * Delete a saved payment method.
     */
    public function destroy(
        Request $request,
        string $paymentMethod
    ): JsonResponse {
        $tenant = $request->user();

        if (!$this->isTenant($tenant)) {
            return response()->json([
                'success' => false,
                'message' => 'Only tenants can manage payment methods.',
            ], 403);
        }

        try {
            $this->stripePaymentMethodService
                ->deletePaymentMethod($tenant, $paymentMethod);

            return response()->json([
                'success' => true,
                'message' => 'Payment method removed successfully.',
            ]);
        } catch (ApiErrorException $e) {
            return $this->stripeErrorResponse($e);
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getStatusCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Unable to remove the payment method.',
            ], 500);
        }
    }

    /**
     * Check whether the authenticated user is a tenant.
     */
    private function isTenant($user): bool
    {
        return $user
            && $user->role
            && strtolower($user->role->name) === 'tenant';
    }

    /**
     * Return a safe Stripe API error response.
     */
    private function stripeErrorResponse(
        ApiErrorException $e
    ): JsonResponse {
        report($e);

        return response()->json([
            'success' => false,
            'message' => 'Stripe was unable to process the request.',
        ], 502);
    }
}