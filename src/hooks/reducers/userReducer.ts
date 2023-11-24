import { createReducer } from '@reduxjs/toolkit';
import { logoutUser, saveUserData } from '../actions/userActions';

interface UserState {
  userData: any;
  accessToken: null | string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userData: null,
  accessToken: '' || null,
  isAuthenticated: false
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveUserData, (state, action) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    })
    .addCase(logoutUser, (state) => {
      state.userData = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    });
});

export default userReducer;
