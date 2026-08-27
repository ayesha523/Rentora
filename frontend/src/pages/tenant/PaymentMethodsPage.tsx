import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  deletePaymentMethod,
  getPaymentMethods,
  savePaymentMethod,
  setDefaultPaymentMethod,
  type SavedPaymentMethod,
} from "../../services/paymentMethodsApi";

import "./PaymentMethodsPage.css";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

function PaymentMethodsContent() {
  const stripe = useStripe();
  const elements = useElements();

  const [methods, setMethods] = useState<SavedPaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMethods = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getPaymentMethods();
      setMethods(data);
    } catch {
      setMethods([]);
      setError(
        "Payment methods could not be loaded. The backend service may not be available yet."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMethods();
  }, [loadMethods]);

  const handleAddPaymentMethod = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!stripe || !elements) {
      setError("Stripe is still loading. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card form is not available.");
      return;
    }

    setSaving(true);

    try {
      const result = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (result.error) {
        setError(
          result.error.message || "Unable to create payment method."
        );
        return;
      }

      if (!result.paymentMethod) {
        setError("Stripe did not return a payment method.");
        return;
      }

      await savePaymentMethod(result.paymentMethod.id);

      card.clear();
      setAdding(false);
      setSuccess("Payment method added successfully.");

      await loadMethods();
    } catch {
      setError(
        "The payment method could not be saved because the backend service is not available yet."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDefault = async (id: string) => {
    setError("");
    setSuccess("");
    setActionId(id);

    try {
      await setDefaultPaymentMethod(id);

      setMethods((current) =>
        current.map((method) => ({
          ...method,
          isDefault: method.id === id,
        }))
      );

      setSuccess("Default payment method updated.");
    } catch {
      setError("Unable to update the default payment method.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Remove this saved payment method?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setActionId(id);

    try {
      await deletePaymentMethod(id);

      setMethods((current) =>
        current.filter((method) => method.id !== id)
      );

      setSuccess("Payment method removed.");
    } catch {
      setError("Unable to remove the payment method.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <main className="page-dark">
      <div className="tenant-page-shell payment-methods-page">
        <section className="tenant-page-header payment-methods-header">
          <div className="tenant-page-header__icon">
            <i className="bi bi-credit-card-2-front" />
          </div>

          <div className="tenant-page-header__content">
            <span className="tenant-panel__eyebrow">
              Billing Settings
            </span>
            <h1>Payment Methods</h1>
            <p>
              Add and manage saved cards securely with Stripe.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-rentora btn-rentora--compact"
            onClick={() => setAdding((current) => !current)}
          >
            <i className="bi bi-plus-lg me-2" />
            Add Payment Method
          </button>
        </section>

        {error && (
          <div className="payment-method-message payment-method-message--error">
            <i className="bi bi-exclamation-circle" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="payment-method-message payment-method-message--success">
            <i className="bi bi-check-circle-fill" />
            <span>{success}</span>
          </div>
        )}

        {adding && (
          <section className="tenant-panel payment-method-add-card">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">
                  Secure Card Entry
                </span>
                <h3>Add a payment method</h3>
              </div>
            </div>

            <form onSubmit={handleAddPaymentMethod}>
              <div className="stripe-card-field">
                <CardElement />
              </div>

              <div className="tenant-actions-row tenant-actions-row--align-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary btn-secondary--compact"
                  onClick={() => setAdding(false)}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-rentora btn-rentora--compact"
                  disabled={!stripe || saving}
                >
                  {saving ? "Saving..." : "Save Payment Method"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="tenant-panel">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">
                Saved Cards
              </span>
              <h3>Your payment methods</h3>
            </div>

            <button
              type="button"
              className="tenant-link-button"
              onClick={() => void loadMethods()}
              disabled={loading}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="tenant-empty-state">
              Loading payment methods...
            </div>
          ) : methods.length === 0 ? (
            <div className="tenant-empty-state">
              <div className="tenant-empty-state__icon">
                <i className="bi bi-credit-card" />
              </div>

              <h4>No saved payment methods</h4>

              <p>
                Saved cards will appear here when the backend is available.
              </p>
            </div>
          ) : (
            <div className="payment-method-list">
              {methods.map((method) => (
                <article
                  key={method.id}
                  className={`payment-method-card ${
                    method.isDefault
                      ? "payment-method-card--default"
                      : ""
                  }`}
                >
                  <div className="payment-method-card__details">
                    <strong>
                      {method.brand} •••• {method.last4}
                    </strong>

                    <span>
                      Expires{" "}
                      {String(method.expMonth).padStart(2, "0")}
                      /{method.expYear}
                    </span>
                  </div>

                  <div className="payment-method-card__actions">
                    {method.isDefault ? (
                      <span className="payment-default-badge">
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary btn-secondary--compact"
                        onClick={() =>
                          void handleDefault(method.id)
                        }
                        disabled={actionId === method.id}
                      >
                        Set Default
                      </button>
                    )}

                    <button
                      type="button"
                      className="payment-remove-button"
                      onClick={() =>
                        void handleDelete(method.id)
                      }
                      disabled={actionId === method.id}
                      aria-label={`Remove card ending in ${method.last4}`}
                    >
                      <i className="bi bi-trash3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="tenant-panel payment-method-note">
          <i className="bi bi-info-circle" />

          <div>
            <strong>Payment method management only</strong>
            <p>
              This page does not process rent or utility payments.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function PaymentMethodsPage() {
  if (!stripePromise) {
    return (
      <main className="page-dark">
        <div className="tenant-page-shell">
          <section className="tenant-panel">
            <div className="tenant-empty-state">
              <h4>Stripe is not configured</h4>
              <p>
                Add VITE_STRIPE_PUBLISHABLE_KEY to enable the card form.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentMethodsContent />
    </Elements>
  );
}

export default PaymentMethodsPage;