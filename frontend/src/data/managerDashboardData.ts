export type StatAccent = 'indigo' | 'blue' | 'purple' | 'cyan';

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
  accent: StatAccent;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';

export interface RentPayment {
  id: number;
  tenant: string;
  flat: string;
  month: string;
  amount: string;
  paymentDate: string;
  status: PaymentStatus;
}

export type ComplaintPriority = 'Low' | 'Medium' | 'High';
export type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved';

export interface Complaint {
  id: number;
  title: string;
  tenantOrFlat: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  submittedDate: string;
}

export type NoticeCategory = 'Community' | 'Maintenance' | 'Payment';

export interface Notice {
  id: number;
  title: string;
  publicationDate: string;
  category: NoticeCategory;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

export const dashboardStats: readonly DashboardStat[] = [
  { id: 'apartments', label: 'Total Apartments', value: '4', description: 'Properties under management', icon: 'bi-buildings', accent: 'indigo' },
  { id: 'flats', label: 'Total Flats', value: '48', description: 'Across all apartment buildings', icon: 'bi-grid-3x3-gap', accent: 'blue' },
  { id: 'occupied', label: 'Occupied Flats', value: '39', description: '81% current occupancy rate', icon: 'bi-house-check', accent: 'purple' },
  { id: 'vacant', label: 'Vacant Flats', value: '9', description: 'Ready for new tenants', icon: 'bi-house-door', accent: 'cyan' },
  { id: 'income', label: 'Monthly Rent Income', value: '৳780,000', description: 'Expected income this month', icon: 'bi-graph-up-arrow', accent: 'blue' },
  { id: 'pending', label: 'Pending Payments', value: '7', description: 'Payments awaiting collection', icon: 'bi-hourglass-split', accent: 'indigo' },
  { id: 'complaints', label: 'Open Complaints', value: '5', description: 'Issues requiring attention', icon: 'bi-chat-left-text', accent: 'purple' },
  { id: 'maintenance', label: 'Maintenance Requests', value: '3', description: 'Active service requests', icon: 'bi-tools', accent: 'cyan' },
];

export const recentPayments: readonly RentPayment[] = [
  { id: 1, tenant: 'Nusrat Jahan', flat: 'A-302', month: 'July 2026', amount: '৳20,000', paymentDate: '12 Jul 2026', status: 'Paid' },
  { id: 2, tenant: 'Arif Rahman', flat: 'B-104', month: 'July 2026', amount: '৳18,500', paymentDate: '10 Jul 2026', status: 'Paid' },
  { id: 3, tenant: 'Sadia Karim', flat: 'C-501', month: 'July 2026', amount: '৳25,000', paymentDate: '—', status: 'Pending' },
  { id: 4, tenant: 'Mahmud Hasan', flat: 'A-204', month: 'July 2026', amount: '৳20,000', paymentDate: '—', status: 'Overdue' },
  { id: 5, tenant: 'Farhana Islam', flat: 'D-403', month: 'July 2026', amount: '৳22,000', paymentDate: '08 Jul 2026', status: 'Paid' },
];

export const recentComplaints: readonly Complaint[] = [
  { id: 1, title: 'Water pressure is low', tenantOrFlat: 'Nusrat Jahan · A-302', priority: 'High', status: 'Open', submittedDate: '16 Jul 2026' },
  { id: 2, title: 'Lift requires inspection', tenantOrFlat: 'Building B', priority: 'High', status: 'In Progress', submittedDate: '15 Jul 2026' },
  { id: 3, title: 'Corridor light replacement', tenantOrFlat: 'Flat C-501', priority: 'Medium', status: 'In Progress', submittedDate: '13 Jul 2026' },
  { id: 4, title: 'Parking access card issue', tenantOrFlat: 'Farhana Islam · D-403', priority: 'Low', status: 'Resolved', submittedDate: '11 Jul 2026' },
];

export const recentNotices: readonly Notice[] = [
  { id: 1, title: 'Community meeting this Friday', publicationDate: '17 Jul 2026', category: 'Community' },
  { id: 2, title: 'Scheduled generator maintenance', publicationDate: '14 Jul 2026', category: 'Maintenance' },
  { id: 3, title: 'July rent payment reminder', publicationDate: '05 Jul 2026', category: 'Payment' },
];

export const quickActions: readonly QuickAction[] = [
  { id: 'add-apartment', label: 'Add Apartment', icon: 'bi-building-add' },
  { id: 'add-tenant', label: 'Add Tenant', icon: 'bi-person-plus' },
  { id: 'record-payment', label: 'Record Rent Payment', icon: 'bi-receipt' },
  { id: 'publish-notice', label: 'Publish Notice', icon: 'bi-megaphone' },
  { id: 'view-complaints', label: 'View Complaints', icon: 'bi-chat-square-text' },
];
