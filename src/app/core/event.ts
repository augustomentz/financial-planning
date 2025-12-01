import { TransactionType } from "../pages/transactions/transactions";

export type Event = {
  id?: string;
  description: string;
  type: TransactionType,
  competency: string
  created_at?: string;
}
