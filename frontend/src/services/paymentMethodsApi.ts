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
  payment_methods?: SavedPaymentMethod[];
  data?: SavedPaymentMethod[];
  message?: string;
}

interface PaymentMethodResponse {
  success: boolean;
  payment_method?: SavedPaymentMethod;
  data?: SavedPaymentMethod;
  message?: string;
}

export async function getPaymentMethods(): Promise<
  SavedPaymentMethod[]
> {
  const response =
    await apiRequest<PaymentMethodsResponse>(
      PAYMENT_METHODS_PATH
    );

  return response.payment_methods ?? response.data ?? [];
}

export async function savePaymentMethod(
  paymentMethodId: string
): Promise<SavedPaymentMethod | null> {
  const response =
    await apiRequest<PaymentMethodResponse>(
      PAYMENT_METHODS_PATH,
      {
        method: "POST",
        body: JSON.stringify({
          payment_method_id: paymentMethodId,
        }),
      }
    );

  return (
    response.payment_method ??
    response.data ??
    null
  );
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