import { configureStore } from '@reduxjs/toolkit';
import userReducer from './hooks/reducers/userReducer';
import parishClusterReducer from './hooks/reducers/parishClusterReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: any) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const persistedState = loadState();

// Define Root State and Dispatch Types
export const store = configureStore({
  reducer: {
    user: userReducer,
    cluster: parishClusterReducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
