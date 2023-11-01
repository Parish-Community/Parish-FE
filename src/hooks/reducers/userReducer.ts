const initialState = {
  userData: null,
  access_token: null
};

const userReducer = (state = initialState, action: { type: any; payload: any; access_token: any }) => {
  switch (action.type) {
    case 'SAVE_USER_LOGIN_DATA':
      return {
        ...state,
        userData: action.payload,
        access_token: action.access_token
      };
    default:
      return state;
  }
};

export default userReducer;
