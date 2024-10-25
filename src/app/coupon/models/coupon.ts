export interface Coupon {
    id: number;
    code: string;
    maxUsages: number;
    expiryDate: Date;
    type: string;
    discount: number;
}