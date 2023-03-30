import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INVOICE_RESPONSE_TYPE } from 'models/invoice';

export interface invoiceReducerType {
  invoices_list: INVOICE_RESPONSE_TYPE;
}

const initialState: invoiceReducerType = {
  invoices_list: {},
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoicesList(
      state: invoiceReducerType,
      action: PayloadAction<INVOICE_RESPONSE_TYPE>
    ) {
      state.invoices_list = action.payload;
    },
  },
});

export const { setInvoicesList } = invoiceSlice.actions;

export default invoiceSlice.reducer;
