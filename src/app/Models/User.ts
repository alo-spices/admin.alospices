export interface User {

  _id?: string;

  name?: string;

  phone: string;

  email?: string;

  password?: string;

  token?: string;

  newPhone?: string;

  newEmail?: string;

  OTP?: string;

  isVerified?: boolean;

  OTPExpires?: string;

  createdAt?: string;
}