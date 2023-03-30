import { AppAPIInstance } from 'config/axios-config';
import { API_ENDPOINTS } from 'constant/api-endpoints';
import { LOGIN_BODY_TYPE } from 'models/authentication';

export const fetchInvoicesApi = async (params: any) => {
  return AppAPIInstance.get(API_ENDPOINTS.fetch_invoices, {
    headers: {
      // 'Operation-Mode': 'SYNC',
      // Cookie: 'JSESSIONID=F08B9B07E6494F9C63FA46AFE7CB3814',
      'Content-Type': 'application/json',
    },
    params: {
      pageNum: 1,
      pageSize: 10,
      dateType: 'INVOICE_DATE',
      sortBy: 'CREATED_DATE',
      ordering: 'ASCENDING',
      status: 'PAID',
      fromDate: '2018-12-20',
      toDate: '2020-12-20',
    },
  });
};
