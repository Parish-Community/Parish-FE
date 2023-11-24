import { createReducer, createAction, current, PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  accessToken: '' || null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    }
  }
});

export const { saveUserData, logoutUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
