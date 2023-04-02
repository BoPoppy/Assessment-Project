import { AppAPIInstance } from 'config/axios-config';
import { API_ENDPOINTS } from 'constant/api-endpoints';
import { FETCH_INVOICE_PARAMS_TYPE } from 'models/invoice';

export const fetchInvoicesApi = async (params: FETCH_INVOICE_PARAMS_TYPE) => {
  return AppAPIInstance.get(API_ENDPOINTS.fetch_invoices, {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
};

export const createNewInvoiceApi = async (data: any) => {
  return AppAPIInstance.post(API_ENDPOINTS.create_invoice, data, {
    headers: {
      'Operation-Mode': 'SYNC',
      'Content-Type': 'application/json',
    },
  });
};
