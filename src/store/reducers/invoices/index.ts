import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INVOICE_RESPONSE_TYPE } from 'models/invoice';

export interface invoiceReducerType {
  invoices_list: INVOICE_RESPONSE_TYPE;
}

const initialState: invoiceReducerType = {
  invoices_list: {
    data: [],
    paging: {
      pageNumber: 0,
      pageSize: 0,
      totalRecords: 0,
    },
    status: {
      code: '',
      message: '',
    },
  },
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoicesList(
      state: invoiceReducerType,
      action: PayloadAction<INVOICE_RESPONSE_TYPE>
    ) {
      // if (action.payload.paging.pageNumber <= 1) {
      //   state.invoices_list = action.payload;
      // } else {
      //   state.invoices_list = {
      //     ...state.invoices_list,
      //     ...action.payload,
      //     data: state.invoices_list.data.concat(action.payload.data),
      //   };
      // }
      state.invoices_list = action.payload;
    },
  },
});

export const { setInvoicesList } = invoiceSlice.actions;

export default invoiceSlice.reducer;
