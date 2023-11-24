import { createAction } from '@reduxjs/toolkit';
interface User {
  userData: any;
  accessToken: null | string;
  isAuthenticated: boolean;
}

export const saveUserData = createAction<User>('SAVE_USER_LOGIN_DATA');
export const logoutUser = createAction<User>('LOGOUT_USER');
