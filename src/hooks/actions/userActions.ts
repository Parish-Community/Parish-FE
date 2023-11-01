export const saveUserData = (userData: any, access_token: any) => ({
  type: 'SAVE_USER_LOGIN_DATA',
  payload: userData,
  access_token: access_token
});
