export interface Supplier {

  _id?: string;

  supplierName: string;
  supplierCode: string;

  contactPerson?: string;

  mobileNumber: string;
  alternateMobileNumber?: string;

  email?: string;

  address?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  pincode?: string;

  gstNumber?: string;
  panNumber?: string;

  paymentTerms?: string;
  openingBalance?: number;

  accountHolderName?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;

  status?: "Active" | "Inactive";

  isDeleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

}