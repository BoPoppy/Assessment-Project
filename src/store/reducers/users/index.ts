import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_PROFILE_TYPE } from 'models/users';

export interface reducerUserType {
  user_profile: USER_PROFILE_TYPE | null;
}

const initialState: reducerUserType = {
  user_profile: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserProfile(
      state: reducerUserType,
      action: PayloadAction<USER_PROFILE_TYPE | null>
    ) {
      state.user_profile = action.payload;
    },
  },
});

export const { updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
