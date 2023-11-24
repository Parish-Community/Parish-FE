import { createReducer } from '@reduxjs/toolkit';
import { saveClusterData } from '../actions/parishClusterActions';

interface ClusterState {
  cluster: any;
}

const initialState: ClusterState = {
  cluster: null
};

const parishClusterReducer = createReducer(initialState, (builder) => {
  builder.addCase(saveClusterData, (state, action) => {
    state.cluster = action.payload.cluster;
  });
});

export default parishClusterReducer;
