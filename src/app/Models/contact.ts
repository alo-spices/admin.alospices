export interface Contact {
  _id?: string;

  fullName: string;

  phoneNumber: string;

  email: string;

  subject: string;

  message: string;

  status: 'New' | 'Contacted' | 'Closed';

  createdAt?: string;

  updatedAt?: string;
}


export interface ContactResponse {
  success: boolean;

  message: string;

  data: Contact;
}


export interface ContactListResponse {
  success: boolean;

  message: string;

  count: number;

  data: Contact[];
}