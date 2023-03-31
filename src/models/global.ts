export interface HeadCell<T = any> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
  isSort: boolean;
}

export type Order = 'ASCENDING' | 'DESCENDING';
