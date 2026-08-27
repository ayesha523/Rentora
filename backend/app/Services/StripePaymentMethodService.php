<?php

namespace App\Services;

use App\Models\User;
use Stripe\PaymentMethod;
use Stripe\StripeClient;

class StripePaymentMethodService
{
    private StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(
            config('services.stripe.secret')
        );
    }

    /**
     * Get the user's existing Stripe Customer,
     * or create one if it doesn't exist.
     */
    public function getOrCreateCustomer(User $tenant): \Stripe\Customer
    {
        if ($tenant->stripe_customer_id) {
            return $this->stripe->customers->retrieve(
                $tenant->stripe_customer_id
            );
        }

        $customer = $this->stripe->customers->create([
            'name' => $tenant->name,
            'email' => $tenant->email,
            'metadata' => [
                'rentora_user_id' => (string) $tenant->id,
            ],
        ]);

        $tenant->update([
            'stripe_customer_id' => $customer->id,
        ]);

        return $customer;
    }

    /**
     * Create a SetupIntent for saving a payment method.
     */
    public function createSetupIntent(User $tenant): \Stripe\SetupIntent
    {
        $customer = $this->getOrCreateCustomer($tenant);

        return $this->stripe->setupIntents->create([
            'customer' => $customer->id,
            'payment_method_types' => ['card'],
            'usage' => 'off_session',
        ]);
    }

    /**
     * Get all saved card payment methods for the tenant.
     */
    public function getPaymentMethods(User $tenant): array
    {
        $customer = $this->getOrCreateCustomer($tenant);

        $paymentMethods = $this->stripe->paymentMethods->all([
            'customer' => $customer->id,
            'type' => 'card',
        ]);

        $defaultPaymentMethodId =
            $customer->invoice_settings->default_payment_method ?? null;

        return collect($paymentMethods->data)
            ->map(function (PaymentMethod $paymentMethod) use ($defaultPaymentMethodId) {
                return [
                    'id' => $paymentMethod->id,
                    'type' => $paymentMethod->type,
                    'brand' => $paymentMethod->card->brand ?? null,
                    'last4' => $paymentMethod->card->last4 ?? null,
                    'exp_month' => $paymentMethod->card->exp_month ?? null,
                    'exp_year' => $paymentMethod->card->exp_year ?? null,
                    'is_default' => $paymentMethod->id === $defaultPaymentMethodId,
                ];
            })
            ->values()
            ->all();
    }

    /**
     * Set a payment method as the tenant's default.
     */
    public function setDefaultPaymentMethod(
        User $tenant,
        string $paymentMethodId
    ): void {
        $customer = $this->getOrCreateCustomer($tenant);

        $paymentMethod = $this->stripe->paymentMethods->retrieve(
            $paymentMethodId
        );

        $this->ensurePaymentMethodBelongsToCustomer(
            $paymentMethod,
            $customer->id
        );

        $this->stripe->customers->update(
            $customer->id,
            [
                'invoice_settings' => [
                    'default_payment_method' => $paymentMethodId,
                ],
            ]
        );
    }

    /**
     * Remove a saved payment method.
     */
    public function deletePaymentMethod(
        User $tenant,
        string $paymentMethodId
    ): void {
        $customer = $this->getOrCreateCustomer($tenant);

        $paymentMethod = $this->stripe->paymentMethods->retrieve(
            $paymentMethodId
        );

        $this->ensurePaymentMethodBelongsToCustomer(
            $paymentMethod,
            $customer->id
        );

        $this->stripe->paymentMethods->detach($paymentMethodId);
    }

    /**
     * Make sure the payment method belongs to this tenant's
     * Stripe Customer.
     */
    private function ensurePaymentMethodBelongsToCustomer(
        PaymentMethod $paymentMethod,
        string $customerId
    ): void {
        if ($paymentMethod->customer !== $customerId) {
            abort(403, 'This payment method does not belong to you.');
        }
    }
}