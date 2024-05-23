import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import App from './components/app/app';

//Styles
import styles from './index.module.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App/>
);

reportWebVitals();
