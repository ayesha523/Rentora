export interface TenantProfile {
  firstName: string;
  role: string;
  tenantSince: string;
}

export interface TenantApartment {
  name: string;
  block: string;
  flat: string;
  status: "Occupied" | "Vacant";
  rent: string;
  moveInDate: string;
}

export interface TenantStat {
  id: string;
  label: string;
  value: string;
  description: string;
  status: string;
  icon: string;
  variant: "primary" | "success" | "warning" | "info";
}

export interface TenantQuickAction {
  id: string;
  title: string;
  icon: string;
  disabled: boolean;
  note: string;
  path?: string;
}

export interface TenantComplaint {
  id: number;
  title: string;
  details: string;
  submittedDate: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
}

export interface TenantPayment {
  id: number;
  title: string;
  paymentDate: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
}

export interface TenantNotice {
  id: number;
  title: string;
  preview: string;
  date: string;
  icon: string;
}

export const tenantProfile: TenantProfile = {
  firstName: "Lutfa",
  role: "Tenant",
  tenantSince: "Aug 2025",
};

export const tenantApartment: TenantApartment = {
  name: "Aurora Heights",
  block: "Block B",
  flat: "Flat B-406",
  status: "Occupied",
  rent: "৳20,000",
  moveInDate: "Jan 2026",
};

export const tenantStats: TenantStat[] = [
  {
    id: "rent",
    label: "Monthly Rent",
    value: "৳20,000",
    description: "Next due: Aug 10, 2026",
    status: "Due in 5 days",
    icon: "bi-cash-stack",
    variant: "primary",
  },
  {
    id: "bills",
    label: "Utility Bills",
    value: "৳3,240",
    description: "Latest bill: Jul 2026",
    status: "Paid",
    icon: "bi-lightning-charge",
    variant: "success",
  },
  {
    id: "complaints",
    label: "My Complaints",
    value: "2",
    description: "Active complaints",
    status: "1 in progress",
    icon: "bi-chat-left-text",
    variant: "warning",
  },
  {
    id: "notices",
    label: "New Notices",
    value: "3",
    description: "Unread notices",
    status: "New updates",
    icon: "bi-bell",
    variant: "info",
  },
];

export const tenantQuickActions: TenantQuickAction[] = [
  {
    id: "pay-rent",
    title: "Pay Rent",
    icon: "bi-credit-card",
    disabled: false,
    note: "Pay your rent",
    path: "/tenant/rent-bills",
  },
  {
    id: "submit-complaint",
    title: "Submit Complaint",
    icon: "bi-chat-left-text",
    disabled: false,
    note: "File a new complaint",
    path: "/tenant/complaints/new",
  },
  {
    id: "view-notices",
    title: "View Notices",
    icon: "bi-megaphone",
    disabled: false,
    note: "See all notices",
    path: "/tenant/notices",
  },
  {
    id: "update-profile",
    title: "Update Profile",
    icon: "bi-person-circle",
    disabled: false,
    note: "Edit your profile",
    path: "/tenant/profile",
  },
];

export const tenantComplaints: TenantComplaint[] = [
  {
    id: 1,
    title: "Water leakage in bathroom",
    details: "A slow leak near the sink is causing damp patches on the ceiling.",
    submittedDate: "Aug 03, 2026",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Intermittent electricity issue",
    details: "Power cuts occur in the evening for short periods.",
    submittedDate: "Jul 28, 2026",
    status: "Open",
  },
];

export const tenantPayments: TenantPayment[] = [
  {
    id: 1,
    title: "Rent – July 2026",
    paymentDate: "Paid on Jul 05, 2026",
    amount: "৳20,000",
    status: "Paid",
  },
  {
    id: 2,
    title: "Utility Bill – July 2026",
    paymentDate: "Paid on Jul 10, 2026",
    amount: "৳3,240",
    status: "Paid",
  },
];

export const tenantNotices: TenantNotice[] = [
  {
    id: 1,
    title: "Lift maintenance on Aug 8",
    preview: "The elevator will be unavailable between 10:00 AM and 2:00 PM.",
    date: "Aug 08, 2026",
    icon: "bi-wrench",
  },
  {
    id: 2,
    title: "Building cleaning schedule",
    preview: "Common areas will receive a deep clean on Friday evening.",
    date: "Aug 06, 2026",
    icon: "bi-broom",
  },
  {
    id: 3,
    title: "Rent payment reminder",
    preview: "Your next rent payment is due on Aug 10, 2026.",
    date: "Aug 04, 2026",
    icon: "bi-currency-dollar",
  },
];