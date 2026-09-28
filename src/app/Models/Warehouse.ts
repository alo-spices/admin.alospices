export interface Warehouse {

  _id?: string;

  warehouseCode: string;

  warehouseName: string;

  warehouseType: 'RAW_MATERIAL' | 'FINISHED_GOODS' | 'BOTH';

  managerName?: string;

  mobileNumber?: string;

  email?: string;

  address?: string;

  city?: string;

  state?: string;

  pincode?: string;

  isActive: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}