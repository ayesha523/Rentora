import type { PaymentStatus } from '../types/managerRecords';

const localDate = (value: string | Date) => {
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
};

export function calculatePaymentStatus(amountDue: number, amountPaid: number, dueDate: string, currentDate: string | Date = new Date()): PaymentStatus {
  const due = Math.max(0, amountDue);
  const paid = Math.max(0, amountPaid);
  if (paid >= due) return 'paid';
  const pastDue = localDate(currentDate).getTime() > localDate(dueDate).getTime();
  if (paid > 0) return pastDue ? 'partially_paid_overdue' : 'partially_paid';
  return pastDue ? 'overdue' : 'pending';
}

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  paid: 'Paid', pending: 'Pending', overdue: 'Overdue', partially_paid: 'Partially paid', partially_paid_overdue: 'Partially paid · overdue',
};
