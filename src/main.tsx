import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/assets/css/styles.css';
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container!);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(app);
