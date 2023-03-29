import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface reducerGlobalType {
  is_global_loading: boolean;
}

const initialState: reducerGlobalType = {
  is_global_loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateIsGlobalLoading(
      state: reducerGlobalType,
      action: PayloadAction<boolean>
    ) {
      state.is_global_loading = action.payload;
    },
  },
});

export const { updateIsGlobalLoading } = globalSlice.actions;

export default globalSlice.reducer;
