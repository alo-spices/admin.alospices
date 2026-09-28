export interface Address {

  _id?: string;

  user: any;

  fullName: string;

  phone: string;

  addressLine1: string;

  addressLine2?: string;

  city: string;

  state: string;

  pincode: string;

  country: string;

  isDefault?: boolean;

  createdAt?: string;

  updatedAt?: string;
}