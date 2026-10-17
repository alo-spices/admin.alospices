export interface Party {

  _id?: string;

  partyType:
    | 'Distributor'
    | 'Wholesaler'
    | 'Retailer';

  partyCode: string;

  partyName: string;

  shopName: string;

  ownerName?: string;

  mobile: string;

  alternateMobile?: string;

  whatsappNumber?: string;

  email?: string;

  shopImage?: string;

  gstNumber?: string;

  panNumber?: string;

  licenseNumber?: string;


  // ==========================================
  // Area
  // ==========================================

  area:
    | string
    | {
        _id: string;
        areaName: string;
      };


  // ==========================================
  // Route
  // ==========================================

  route:
    | string
    | {
        _id: string;
        routeName: string;
      };


  // ==========================================
  // Assigned Salesman
  // ==========================================

  assignedSalesman?:
    | string
    | {
        _id: string;
        fullName: string;
      }
    | null;


  // ==========================================
  // Address
  // ==========================================

  address?: string;

  city?: string;

  district?: string;

  state?: string;

  pincode?: string;


  // ==========================================
  // Location
  // ==========================================

  latitude?: number | null;

  longitude?: number | null;


  // ==========================================
  // Credit
  // ==========================================

  creditLimit?: number;

  creditDays?: number;

  openingBalance?: number;


  // ==========================================
  // User
  // ==========================================

  user?:
    | string
    | null;


  // ==========================================
  // Status
  // ==========================================

  status: 'Active' | 'Inactive';

  isDeleted?: boolean;

  createdAt?: Date | string;

  updatedAt?: Date | string;

}