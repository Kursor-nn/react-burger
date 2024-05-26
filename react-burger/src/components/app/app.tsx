import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import Header from '../header/header';
import BurgerConstructor from '../burger-constructor/constructor';
import BurgerIngredients from '../burger-ingredients/ingredients';

//Styles
import styles from './app.module.css';

import reportWebVitals from '../../reportWebVitals';

function App() {
  return (
    <div className={styles.main_columns}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default App;
