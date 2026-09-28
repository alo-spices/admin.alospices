export interface Order {

    _id?: string;

    orderNumber?: string;

    orderDate?: Date | string;

    party?: any;

    partyType?:
    | 'Distributor'
    | 'Wholesaler'
    | 'Retailer';

    employee?: any;

    visit?: any;

    subTotal?: number;

    discountAmount?: number;

    taxableAmount?: number;

    gstAmount?: number;

    grandTotal?: number;

    orderStatus?:
    | 'Pending'
    | 'Approved'
    | 'Processing'
    | 'Delivered'
    | 'Cancelled';

    paymentStatus?:
    | 'Pending'
    | 'Partial'
    | 'Paid';

    paidAmount?: number;

    balanceAmount?: number;

    remarks?: string;

    isDeleted?: boolean;

    createdAt?: Date | string;

    updatedAt?: Date | string;
}