export interface Route {
_id?: string;

routeName: string;
routeCode: string;
description?: string;

area: string;

salesManager?: string | null;
salesmen?: string[];

distributor?: string | null;

monthlySalesTarget?: number;
monthlyCollectionTarget?: number;

status: 'Active' | 'Inactive';

isDeleted?: boolean;

createdAt?: Date;
updatedAt?: Date;
}
