import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import Header from '../header/header';
import BurgerConstructor from '../burger-constructor/constructor';
import BurgerIngredients from '../burger-ingredients/ingredients';

//Styles
import styles from './app.module.css';

import reportWebVitals from '../../reportWebVitals';

class App extends React.Component {
  render() {
    return (
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
  }
}

export default App;
