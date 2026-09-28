export interface StockReceive {
  batchNo: string;
  availableWeightKg: number;

  _id?: string;

  receiveNo: string;

  supplier: any;

  warehouse: any;

  invoiceNo: string;

  invoiceDate: Date;

  receivedDate?: Date;

  remarks?: string;

  status?: string;

  isDeleted?: boolean;

  items: StockReceiveItem[];

}

export interface StockReceiveItem {

  rawMaterial: any;

  batchNo: string;

  noOfBags: number;

  bagWeightKg: number;

  totalWeightKg?: number;

  availableWeightKg?: number;

  rate: number;

  amount?: number;

}