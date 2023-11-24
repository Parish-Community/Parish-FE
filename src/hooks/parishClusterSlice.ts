import { createReducer, createAction, current, PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  parishCluster: null
};

const parishClusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    saveParishCluster: (state, action) => {
      console.log('saveParishCluster', action.payload);
      state.parishCluster = action.payload.parishCluster;
    }
  }
});

export const { saveParishCluster } = parishClusterSlice.actions;
const parishClusterReducer = parishClusterSlice.reducer;

export default parishClusterReducer;
