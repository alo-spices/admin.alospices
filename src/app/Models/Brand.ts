export interface Brand {

  _id?: string;

  brandName: string;

  brandCode: string;

  description?: string;

  logo?: string;

  bannerImage?: string;

  status: 'Active' | 'Inactive';

  displayOrder?: number;

  createdAt?: Date;

  updatedAt?: Date;

}