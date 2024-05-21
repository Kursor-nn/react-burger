import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import Header from './components/header/header';
import BurgerConstructor from './components/burger-constructor/constructor';
import BurgerIngredients from './components/burger-ingredients/ingredients';

//Styles
import styles from './index.module.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <main className={styles.main_rect}>
      <Header />
      <div className={styles.main_columns}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  </React.StrictMode>
);

reportWebVitals();
