
// export interface Production {

//   _id?: string;

//   productionNo: string;

//   productionDate: Date;

//   warehouse: Warehouse;

//   rawMaterial: RawMaterial;

//   finishedProduct: FinishedProduct;

//   rawMaterials: ProductionRawMaterial[];

//   rawWeightUsedKg: number;

//   totalProducedWeightKg: number;

//   wasteKg: number;

//   productionItems: ProductionItem[];

//   remarks?: string;

//   status: string;

//   createdAt?: Date;

//   updatedAt?: Date;

// }

// export interface Warehouse {

//   _id: string;

//   warehouseName: string;

//   warehouseCode: string;

//   warehouseType?: string;

// }

// export interface RawMaterial {

//   _id: string;

//   rawMaterialName: string;

//   rawMaterialCode: string;

//   unit: string;

// }

// export interface FinishedProduct {

//   _id: string;

//   productName: string;

//   productCode: string;

// }

// export interface ProductionRawMaterial {

//   stockReceive: StockReceive;

//   rawMaterial: RawMaterial;

//   batchNo: string;

//   weightUsedKg: number;

// }

// export interface StockReceive {

//   _id: string;

//   receiveNo: string;

// }

// export interface ProductionItem {

//   variantId: string;

//   skuCode: string;

//   packSize: string;

//   weightInGrams: number;

//   packsProduced: number;

//   totalWeightUsedKg: number;

//   rejectedPacks: number;

// }
// ====================
// ==========================================
// PRODUCTION MODEL
// ==========================================

// ==========================================
// RAW MATERIAL USED
// ==========================================

export interface ProductionRawMaterial {

  stockReceive: string;

  rawMaterial: string;

  batchNo: string;

  availableWeightKg: number;

  weightUsedKg: number;
}



// IKKADA ADD CHEYYALI



// ==========================================
// PRODUCTION VARIANT
// ==========================================

export interface ProductionItem {

  _id?: string;

  variantName: string;

  skuCode: string;
  batchNo: string;

  packSize: string;

  weightInGrams: number;

  packsProduced: number;

  rejectedPacks: number;

  totalWeightUsedKg: number;
}


// ==========================================
// PRODUCTION
// ==========================================

export interface Production {

  _id?: string;

  productionNo: string;

  productionDate?: string | Date;

  warehouse: string;

  rawMaterials: ProductionRawMaterial[];

  rawWeightUsedKg: number;

  productionItems: ProductionItem[];

  totalProducedWeightKg: number;

  wasteKg: number;

  remarks?: string;

  status?: 'Pending' | 'Completed' | 'Cancelled';

  isDeleted?: boolean;

  createdAt?: string;

  updatedAt?: string;
}


// ==========================================
// CREATE PRODUCTION PAYLOAD
// ==========================================

export interface CreateProductionPayload {

  productionNo: string;

  productionDate?: string;

  warehouse: string;

  rawMaterials: ProductionRawMaterial[];

  productionItems: ProductionItem[];

  remarks?: string;
}


// ==========================================
// API RESPONSE
// ==========================================

export interface ProductionResponse {

  success: boolean;

  message: string;

  data: Production;
}


// ==========================================
// LIST RESPONSE
// ==========================================

export interface ProductionListResponse {

  success: boolean;

  data: Production[];

  count?: number;
}
// =====================================================
// AVAILABLE STOCK
// =====================================================

export interface ProductionStock {

  _id?: string;

  stockReceiveId?: string;

  receiveNo: string;

  invoiceNo: string;

  invoiceDate?: string;

  batchNo: string;

  totalWeightKg: number;

  usedWeightKg: number;

  availableWeightKg: number;

  status: string;

  warehouse?: any;

  rawMaterial?: any;

}


// =====================================================
// PRODUCTION SUMMARY
// =====================================================

export interface ProductionSummary {

  rawWeight: number;

  producedWeight: number;

  waste: number;

  remaining: number;

}