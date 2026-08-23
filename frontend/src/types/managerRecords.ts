export type RecordId = number | string;
export type ApartmentStatus = 'active' | 'inactive' | 'under_maintenance';
export type PropertyType = 'apartment_building' | 'residential_complex' | 'mixed_use' | 'other';

export interface Apartment {
  id: RecordId;
  name: string;
  code?: string | null;
  propertyType: PropertyType;
  streetAddress: string;
  city: string;
  state?: string | null;
  postcode?: string | null;
  country?: string | null;
  floors?: number | null;
  contactName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  status: ApartmentStatus;
  description?: string | null;
  amenities?: string | null;
  totalFlats?: number | null;
  occupiedFlats?: number | null;
  vacantFlats?: number | null;
}

export type ApartmentFormValues = Omit<Apartment, 'id' | 'totalFlats' | 'occupiedFlats' | 'vacantFlats'>;
export type OccupancyStatus = 'vacant' | 'occupied' | 'reserved' | 'maintenance';

export interface Flat {
  id: RecordId;
  apartmentId: RecordId;
  apartmentName: string;
  apartmentAddress: string;
  unitNumber: string;
  floor: number;
  areaSqFt: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  monthlyRent?: number | null;
  securityDeposit?: number | null;
  occupancy: OccupancyStatus;
  availabilityDate?: string | null;
  notes?: string | null;
  tenantName?: string | null;
  leasePeriod?: string | null;
  leaseStatus?: string | null;
}

export interface FlatFormValues {
  apartmentId: RecordId | '';
  unitNumber: string;
  floor: number | '';
  areaSqFt: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  monthlyRent: number | '';
  securityDeposit: number | '';
  occupancy: OccupancyStatus;
  availabilityDate: string;
  notes: string;
}

export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partially_paid' | 'partially_paid_overdue';
export interface RentPayment {
  id: RecordId;
  tenantName: string;
  apartmentName: string;
  flatNumber: string;
  billingPeriod: string;
  amountDue: number;
  dueDate: string;
  amountPaid: number;
  paidDate?: string | null;
  paymentMethod?: string | null;
}

export type NoticeCategory = 'general' | 'payment_reminder' | 'maintenance' | 'emergency' | 'community';
export type NoticeAudience = 'all_tenants' | 'selected_apartment' | 'selected_flat' | 'selected_tenant';
export type NoticePriority = 'normal' | 'important' | 'urgent';
export type NoticeStatus = 'draft' | 'published';
export interface Notice {
  id: RecordId;
  title: string;
  category: NoticeCategory;
  audience: NoticeAudience;
  audienceLabel?: string | null;
  targetId?: RecordId | null;
  priority: NoticePriority;
  publishAt?: string | null;
  expiresAt?: string | null;
  body: string;
  status: NoticeStatus;
}
export type NoticeFormValues = Omit<Notice, 'id' | 'audienceLabel'>;

export type SystemAlertType = 'rent_due' | 'payment_overdue' | 'lease_expiring' | 'maintenance_overdue';
export interface SystemAlert {
  id: RecordId;
  type: SystemAlertType;
  tenantName?: string | null;
  apartmentName: string;
  flatNumber?: string | null;
  dueDate?: string | null;
  status: string;
}

export interface ListResponse<T> { data: T[]; message?: string; }
export interface PaginatedResponse<T> extends ListResponse<T> { currentPage: number; perPage: number; total: number; lastPage: number; }
export interface MutationState { submitting?: boolean; successMessage?: string | null; apiError?: string | null; }
export interface CrudCallbacks<TRecord, TForm> {
  onCreate?: (values: TForm) => void | Promise<void>;
  onUpdate?: (id: RecordId, values: TForm) => void | Promise<void>;
  onDelete?: (id: RecordId) => void | Promise<void>;
  onView?: (record: TRecord) => void;
}
