import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import App from './components/app/app';
import Header from './components/header/header';

//Styles
import styles from './index.module.css';

import reportWebVitals from './reportWebVitals';

//Store
import store from './services/init'
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <main className={styles.main_rect}>
        <BrowserRouter>
          <Header />
          <App />
        </BrowserRouter>
      </main>
    </React.StrictMode>
  </Provider>

);

reportWebVitals();
