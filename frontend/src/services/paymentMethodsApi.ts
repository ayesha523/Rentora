import { apiRequest } from "./api";

export interface SavedPaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const PAYMENT_METHODS_PATH = "/tenant/payment-methods";

interface PaymentMethodsResponse {
  success: boolean;
  data?: SavedPaymentMethod[];
  message?: string;
}

interface SetupIntentResponse {
  success: boolean;
  data?: {
    client_secret: string;
  };
  message?: string;
}

export async function getPaymentMethods(): Promise<SavedPaymentMethod[]> {
  const response = await apiRequest<PaymentMethodsResponse>(
    PAYMENT_METHODS_PATH
  );

  return response.data ?? [];
}

export async function createSetupIntent(): Promise<string> {
  const response = await apiRequest<SetupIntentResponse>(
    `${PAYMENT_METHODS_PATH}/setup-intent`,
    {
      method: "POST",
    }
  );

  if (!response.data?.client_secret) {
    throw new Error("Stripe setup intent was not created.");
  }

  return response.data.client_secret;
}

export async function setDefaultPaymentMethod(
  paymentMethodId: string
): Promise<void> {
  await apiRequest(
    `${PAYMENT_METHODS_PATH}/${paymentMethodId}/default`,
    {
      method: "PATCH",
    }
  );
}

export async function deletePaymentMethod(
  paymentMethodId: string
): Promise<void> {
  await apiRequest(
    `${PAYMENT_METHODS_PATH}/${paymentMethodId}`,
    {
      method: "DELETE",
    }
  );
}