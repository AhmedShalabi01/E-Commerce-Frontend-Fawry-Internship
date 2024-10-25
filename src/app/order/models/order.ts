export interface Order {
    email: string,
    accountNumber: number,
    coupon?: string,
    storeId: number,
    orderItems: any[]
}