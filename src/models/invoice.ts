import { Order } from './global';

export interface FETCH_INVOICE_PARAMS_TYPE {
  pageNum: number;
  pageSize: number;
  sortBy: string;
  ordering: Order;
  status: string;
  fromDate: string;
  toDate: string;
}

export interface INVOICE_RESPONSE_TYPE {
  data: INVOICE_DATA[];
  paging: {
    totalRecords: number;
    pageSize: number;
    pageNumber: number;
  };
  status: {
    code: string;
    message: string;
  };
}

export interface INVOICE_DATA {
  invoiceId: string;
  invoiceNumber: string;
  referenceNo: string;
  type: string;
  currency: string;
  invoiceDate: string;
  createdAt: string;
  dueDate: string;
  status: {
    key: string;
    value: boolean;
  }[];
  subStatus: any[];
  numberOfDocuments: number;
  totalTax: number;
  totalAmount: number;
  balanceAmount: number;
  description: string;
  totalPaid: number;
  invoiceSubTotal: number;
  customFields: {
    key: string;
    value: string;
  }[];
  totalDiscount: number;
  extensions: any[];
  version: string;
  customer: {
    id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    addresses: any[];
  };
  merchant: {
    id: string;
  };
  invoiceGrossTotal: number;
}
