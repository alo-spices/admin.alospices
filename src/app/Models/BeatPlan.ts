export interface BeatPlan {
  _id?: string;
  beatName: string;
  description?: string;

  area?: {
    _id: string;
    areaName: string;
    areaCode: string;
  };

  route?: {
    _id: string;
    routeName?: string;
    routeCode?: string;
  } | null;

  salesman?: {
    _id: string;
    fullName: string;
    employeeCode: string;
  };

  day: string;

  shops: string[];

  status: 'Active' | 'Inactive';

  isStarted: boolean;
  isCompleted: boolean;

  completedShops: string[];
  pendingShops: string[];

  isDeleted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface BeatPlanResponse {
  message: string;
  success: boolean;
  count: number;
  data: BeatPlan[];
}