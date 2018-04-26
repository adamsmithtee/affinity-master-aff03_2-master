export interface ITransaction{
  customer_id : string;
  transaction_id : number;
  amount : string;
  merchant_id : string;
  remarks: string;
  transaction_type : string;
  offer_id : string;
}