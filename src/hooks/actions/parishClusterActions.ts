import { createAction } from '@reduxjs/toolkit';
interface Cluster {
  cluster: any;
}

export const saveClusterData = createAction<Cluster>('SAVE_CLUSTER_DATA');
