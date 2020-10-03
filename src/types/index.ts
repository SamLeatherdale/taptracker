export type TransactionType = {
  id: string;
  date: string;
  completed: boolean;
  name?: string;
  amount?: string;
};
export type TransactionList = Record<string, TransactionType>
export type SettingsType = {
  rolloverDay: number;
  transactionCount: number;
}