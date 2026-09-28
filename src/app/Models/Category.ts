export interface Category {

  _id?: string;

  categoryName: string;

  categoryCode: string;

  description?: string;

  brand: any;

  image?: string;

  displayOrder?: number;

  status?: string;

  isDeleted?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}