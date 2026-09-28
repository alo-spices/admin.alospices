export interface Variant {

  _id?: string;

  packSize: string;

  skuCode: string;

  stock: number;

  mrp: number;

  gstPercentage: number;

  image?: string;

  gallery?: string[];

  weightInGrams?: number;

  status?: string;

}

export interface Product {

  _id?: string;

  productName: string;

  productCode: string;

  shortDescription?: string;
    rawMaterial: string;   // <-- Add this

  description?: string;

  brand: any;

  category: any;

  hsnCode?: string;

  gstPercentage?: number;

  productType?: string;

  variants: Variant[];

  displayOrder?: number;

  featuredProduct?: boolean;

  status?: string;

  isDeleted?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}