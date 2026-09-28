export interface RawMaterial {

  _id?: string;

  // ==========================
  // Basic Details
  // ==========================

  rawMaterialName: string;

  rawMaterialCode: string;

  brand: any;

  category: any;

  // ==========================
  // Business Details
  // ==========================

  hsnCode?: string;

  gstPercentage?: number;

  unit: string;

  description?: string;

  // ==========================
  // Status
  // ==========================

  status: "Active" | "Inactive";

  isDeleted?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}