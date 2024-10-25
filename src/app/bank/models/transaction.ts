export interface Transaction {
    id: number;
    cardnumber: number;
    timestamp: Date;
    type: string;
    amount: number;
}