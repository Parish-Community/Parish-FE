import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/assets/css/styles.css';

const container = document.getElementById('root');
const root = createRoot(container!);

const app = <App />;

root.render(app);
