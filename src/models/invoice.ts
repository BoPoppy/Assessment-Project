export interface FETCH_INVOICE_PARAMS_TYPE {
  pageNum: number;
  pageSize: number;
  dateType: string;
  sortBy: string;
  ordering: 'ASCENDING' | 'DESCENDING';
  status: string;
  fromDate: string;
  toDate: string;
}

export interface INVOICE_RESPONSE_TYPE {}
