export interface TableData<T> {
  type: string;
  rowData: T[];
  columnData: ColumnData[];
}

export interface ExpenseRowData {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface IncomeRowData {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface InvestmentRowData {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface ColumnData {
  name: string;
  uid: string;
  sortable?: boolean;
}
