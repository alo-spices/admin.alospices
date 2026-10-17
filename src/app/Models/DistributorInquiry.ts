export interface DistributorInquiry {

  _id?: string;

  fullName: string;

  phoneNumber: string;

  location: string;

  message: string;

  status: 'New' | 'Contacted' | 'Closed';

  createdAt?: string;

  updatedAt?: string;

}


export interface DistributorInquiryResponse {

  success: boolean;

  message: string;

  data: DistributorInquiry;

}


export interface DistributorInquiryListResponse {

  success: boolean;

  message: string;

  count: number;

  data: DistributorInquiry[];

}