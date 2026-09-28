export interface Employee {

    _id?: string;

    firstName: string;

    lastName?: string;

    fullName?: string;

    employeeCode?: string;

    profileImage?: string;

    gender?: string;

    dateOfBirth?: Date;

    mobile: string;

    alternateMobile?: string;

    email?: string;

    role: string;

    isApproved?: boolean;

    approvedBy?: string;

    approvedAt?: Date;

    status?: string;

    area?: any;

    route?: any;

    reportingManager?: any;

    distributorName?: string;

    shopName?: string;

    gstNumber?: string;

    panNumber?: string;

    addressLine1?: string;

    addressLine2?: string;

    city?: string;

    state?: string;

    pincode?: string;

    lastLoginAt?: Date;

    lastLoginIP?: string;

    isDeleted?: boolean;

    createdAt?: Date;

    updatedAt?: Date;

}