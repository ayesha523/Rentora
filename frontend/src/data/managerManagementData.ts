export type ManagerSection = 'overview' | 'apartments' | 'flats' | 'tenants' | 'rent' | 'utilities' | 'complaints' | 'notices' | 'reports';

export interface ManagerNavigationItem { id: ManagerSection; label: string; shortLabel: string; description: string; icon: string; }
export interface Apartment { id: number; name: string; address: string; flats: number; occupied: number; vacant: number; contact: string; status: 'Active' | 'Maintenance'; image: string; }
export interface Flat { id: number; number: string; apartment: string; floor: string; tenant: string; rent: string; occupancy: 'Occupied' | 'Vacant' | 'Maintenance'; lease: 'Active' | 'Expiring' | 'Available'; }
export interface Tenant { id: number; name: string; flat: string; apartment: string; contact: string; lease: string; rentStatus: 'Paid' | 'Pending' | 'Overdue'; accountStatus: 'Active' | 'Notice'; }
export interface Payment { id: number; tenant: string; apartment: string; flat: string; month: string; amount: string; dueDate: string; paymentDate: string; status: 'Paid' | 'Pending' | 'Overdue'; }
export interface UtilityBill { id: number; tenant: string; flat: string; electricity: string; water: string; gas: string; month: string; total: string; dueDate: string; status: 'Paid' | 'Pending' | 'Overdue'; }
export interface ManagementComplaint { id: number; title: string; tenant: string; flat: string; category: string; priority: 'Low' | 'Medium' | 'High'; submitted: string; status: 'New' | 'In Progress' | 'Resolved' | 'Closed'; }
export interface MaintenanceRequest { id: number; title: string; property: string; assigned: string; priority: 'Low' | 'Medium' | 'High'; date: string; status: 'New' | 'In Progress' | 'Resolved' | 'Closed'; }
export interface ManagementNotice { id: number; title: string; category: string; audience: string; published: string; status: 'Published' | 'Draft' | 'Scheduled'; description: string; }
export interface ManagerReport { id: number; title: string; description: string; range: string; icon: string; }

export const managerNavigation: readonly ManagerNavigationItem[] = [
  { id: 'overview', label: 'Dashboard', shortLabel: 'Overview', description: 'Portfolio performance at a glance', icon: 'bi-grid-1x2' },
  { id: 'apartments', label: 'Apartment Management', shortLabel: 'Apartments', description: 'Manage buildings and property records', icon: 'bi-buildings' },
  { id: 'flats', label: 'Flat Management', shortLabel: 'Flats', description: 'Track units, occupancy, and leases', icon: 'bi-door-open' },
  { id: 'tenants', label: 'Tenant Management', shortLabel: 'Tenants', description: 'Manage residents and lease accounts', icon: 'bi-people' },
  { id: 'rent', label: 'Rent Collection', shortLabel: 'Rent Collection', description: 'Review and record monthly payments', icon: 'bi-wallet2' },
  { id: 'utilities', label: 'Utility Bill Management', shortLabel: 'Utilities', description: 'Monitor utility billing and balances', icon: 'bi-lightning-charge' },
  { id: 'complaints', label: 'Complaints & Maintenance', shortLabel: 'Service Desk', description: 'Resolve resident issues and service work', icon: 'bi-tools' },
  { id: 'notices', label: 'Notice Management', shortLabel: 'Notices', description: 'Publish community communications', icon: 'bi-megaphone' },
  { id: 'reports', label: 'Reports', shortLabel: 'Reports', description: 'Review operational performance reports', icon: 'bi-bar-chart-line' },
];

export const apartments: readonly Apartment[] = [
  { id: 1, name: 'Aurora Heights', address: '12 Lake View Road, Dhaka', flats: 16, occupied: 14, vacant: 2, contact: 'Property office · 01711-204810', status: 'Active', image: 'bi-building' },
  { id: 2, name: 'Rentora Garden', address: '28 Green Avenue, Dhaka', flats: 12, occupied: 10, vacant: 2, contact: 'Rafi Ahmed · 01816-330912', status: 'Active', image: 'bi-buildings-fill' },
  { id: 3, name: 'Bluebell Residence', address: '7 North Crescent, Dhaka', flats: 10, occupied: 8, vacant: 2, contact: 'Nadia Karim · 01912-408115', status: 'Maintenance', image: 'bi-building-gear' },
  { id: 4, name: 'Parkside Court', address: '44 Park Lane, Dhaka', flats: 10, occupied: 7, vacant: 3, contact: 'Imran Hasan · 01620-775014', status: 'Active', image: 'bi-building-check' },
];

export const flats: readonly Flat[] = [
  { id: 1, number: 'A-302', apartment: 'Aurora Heights', floor: '3rd', tenant: 'Nusrat Jahan', rent: '৳20,000', occupancy: 'Occupied', lease: 'Active' },
  { id: 2, number: 'A-204', apartment: 'Aurora Heights', floor: '2nd', tenant: 'Mahmud Hasan', rent: '৳20,000', occupancy: 'Occupied', lease: 'Expiring' },
  { id: 3, number: 'B-104', apartment: 'Rentora Garden', floor: '1st', tenant: 'Arif Rahman', rent: '৳18,500', occupancy: 'Occupied', lease: 'Active' },
  { id: 4, number: 'B-305', apartment: 'Rentora Garden', floor: '3rd', tenant: 'Unassigned', rent: '৳18,500', occupancy: 'Vacant', lease: 'Available' },
  { id: 5, number: 'C-501', apartment: 'Bluebell Residence', floor: '5th', tenant: 'Sadia Karim', rent: '৳25,000', occupancy: 'Maintenance', lease: 'Active' },
  { id: 6, number: 'D-403', apartment: 'Parkside Court', floor: '4th', tenant: 'Farhana Islam', rent: '৳22,000', occupancy: 'Occupied', lease: 'Active' },
];

export const tenants: readonly Tenant[] = [
  { id: 1, name: 'Nusrat Jahan', flat: 'A-302', apartment: 'Aurora Heights', contact: '01712-334455', lease: 'Jan–Dec 2026', rentStatus: 'Paid', accountStatus: 'Active' },
  { id: 2, name: 'Arif Rahman', flat: 'B-104', apartment: 'Rentora Garden', contact: '01815-228844', lease: 'Mar 2026–Feb 2027', rentStatus: 'Paid', accountStatus: 'Active' },
  { id: 3, name: 'Sadia Karim', flat: 'C-501', apartment: 'Bluebell Residence', contact: '01918-776321', lease: 'Jul 2025–Aug 2026', rentStatus: 'Pending', accountStatus: 'Active' },
  { id: 4, name: 'Mahmud Hasan', flat: 'A-204', apartment: 'Aurora Heights', contact: '01611-990234', lease: 'Sep 2025–Aug 2026', rentStatus: 'Overdue', accountStatus: 'Notice' },
  { id: 5, name: 'Farhana Islam', flat: 'D-403', apartment: 'Parkside Court', contact: '01730-448852', lease: 'Apr 2026–Mar 2027', rentStatus: 'Paid', accountStatus: 'Active' },
];

export const payments: readonly Payment[] = [
  { id: 1, tenant: 'Nusrat Jahan', apartment: 'Aurora Heights', flat: 'A-302', month: 'August 2026', amount: '৳20,000', dueDate: '05 Aug 2026', paymentDate: '03 Aug 2026', status: 'Paid' },
  { id: 2, tenant: 'Arif Rahman', apartment: 'Rentora Garden', flat: 'B-104', month: 'August 2026', amount: '৳18,500', dueDate: '05 Aug 2026', paymentDate: '02 Aug 2026', status: 'Paid' },
  { id: 3, tenant: 'Sadia Karim', apartment: 'Bluebell Residence', flat: 'C-501', month: 'August 2026', amount: '৳25,000', dueDate: '05 Aug 2026', paymentDate: '—', status: 'Pending' },
  { id: 4, tenant: 'Mahmud Hasan', apartment: 'Aurora Heights', flat: 'A-204', month: 'July 2026', amount: '৳20,000', dueDate: '05 Jul 2026', paymentDate: '—', status: 'Overdue' },
  { id: 5, tenant: 'Farhana Islam', apartment: 'Parkside Court', flat: 'D-403', month: 'August 2026', amount: '৳22,000', dueDate: '05 Aug 2026', paymentDate: '01 Aug 2026', status: 'Paid' },
];

export const utilityBills: readonly UtilityBill[] = [
  { id: 1, tenant: 'Nusrat Jahan', flat: 'A-302', electricity: '৳2,450', water: '৳600', gas: '৳1,080', month: 'July 2026', total: '৳4,130', dueDate: '10 Aug 2026', status: 'Pending' },
  { id: 2, tenant: 'Arif Rahman', flat: 'B-104', electricity: '৳2,100', water: '৳600', gas: '৳1,080', month: 'July 2026', total: '৳3,780', dueDate: '10 Aug 2026', status: 'Paid' },
  { id: 3, tenant: 'Sadia Karim', flat: 'C-501', electricity: '৳3,200', water: '৳750', gas: '৳1,080', month: 'July 2026', total: '৳5,030', dueDate: '10 Aug 2026', status: 'Pending' },
  { id: 4, tenant: 'Mahmud Hasan', flat: 'A-204', electricity: '৳2,800', water: '৳600', gas: '৳1,080', month: 'June 2026', total: '৳4,480', dueDate: '10 Jul 2026', status: 'Overdue' },
];

export const managementComplaints: readonly ManagementComplaint[] = [
  { id: 1, title: 'Water pressure is low', tenant: 'Nusrat Jahan', flat: 'A-302', category: 'Plumbing', priority: 'High', submitted: '03 Aug 2026', status: 'New' },
  { id: 2, title: 'Parking access card issue', tenant: 'Farhana Islam', flat: 'D-403', category: 'Access', priority: 'Low', submitted: '01 Aug 2026', status: 'Resolved' },
  { id: 3, title: 'Air conditioner drainage leak', tenant: 'Arif Rahman', flat: 'B-104', category: 'Maintenance', priority: 'Medium', submitted: '30 Jul 2026', status: 'In Progress' },
];

export const maintenanceRequests: readonly MaintenanceRequest[] = [
  { id: 1, title: 'Lift safety inspection', property: 'Rentora Garden', assigned: 'Elevate Services', priority: 'High', date: '04 Aug 2026', status: 'In Progress' },
  { id: 2, title: 'Corridor light replacement', property: 'Bluebell · Floor 5', assigned: 'Kamal Electric', priority: 'Medium', date: '02 Aug 2026', status: 'New' },
  { id: 3, title: 'Roof water tank cleaning', property: 'Parkside Court', assigned: 'CleanFlow Ltd.', priority: 'Low', date: '28 Jul 2026', status: 'Closed' },
];

export const notices: readonly ManagementNotice[] = [
  { id: 1, title: 'Community meeting this Friday', category: 'Community', audience: 'All residents', published: '03 Aug 2026', status: 'Published', description: 'Monthly resident meeting in the Aurora Heights community room.' },
  { id: 2, title: 'Scheduled generator maintenance', category: 'Maintenance', audience: 'Rentora Garden', published: '04 Aug 2026', status: 'Scheduled', description: 'Generator service window from 10:00 AM to 12:00 PM.' },
  { id: 3, title: 'August rent payment reminder', category: 'Payment', audience: 'Pending accounts', published: '01 Aug 2026', status: 'Published', description: 'A friendly reminder that monthly rent is due by 5 August.' },
  { id: 4, title: 'Updated parking guidelines', category: 'Community', audience: 'All residents', published: '—', status: 'Draft', description: 'New visitor parking and access-card guidelines.' },
];

export const reports: readonly ManagerReport[] = [
  { id: 1, title: 'Occupancy Report', description: 'Occupied and vacant unit trends by property.', range: 'August 2026', icon: 'bi-house-check' },
  { id: 2, title: 'Rent Collection Report', description: 'Collection totals, timing, and payment status.', range: 'August 2026', icon: 'bi-cash-coin' },
  { id: 3, title: 'Outstanding Payment Report', description: 'Pending and overdue tenant balances.', range: 'As of 4 Aug 2026', icon: 'bi-exclamation-circle' },
  { id: 4, title: 'Complaint Report', description: 'Resident issues by category and resolution status.', range: 'Last 30 days', icon: 'bi-chat-left-text' },
  { id: 5, title: 'Maintenance Report', description: 'Open service work and completion performance.', range: 'Last 30 days', icon: 'bi-tools' },
  { id: 6, title: 'Utility Summary', description: 'Utility charges and outstanding bills by property.', range: 'July 2026', icon: 'bi-lightning-charge' },
];
