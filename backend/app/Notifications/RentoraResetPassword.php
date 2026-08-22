<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RentoraResetPassword extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The password reset token.
     */
    public function __construct(
        protected string $token
    ) {
    }

    /**
     * Get the notification delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Build the password reset email.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $frontendUrl = rtrim(
            config(
                'app.frontend_url',
                env('FRONTEND_URL', 'http://localhost:5173')
            ),
            '/'
        );

        $resetUrl = $frontendUrl
            . '/reset-password?token='
            . urlencode($this->token)
            . '&email='
            . urlencode($notifiable->getEmailForPasswordReset());

        return (new MailMessage)
            ->subject('Reset your Rentora password')
            ->greeting('Hello ' . ($notifiable->name ?? '') . '!')
            ->line('We received a request to reset your Rentora password.')
            ->action('Reset Password', $resetUrl)
            ->line('This password reset link will expire in 60 minutes.')
            ->line('If you did not request a password reset, you can safely ignore this email.');
    }
}