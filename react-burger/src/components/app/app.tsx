import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import Header from '../header/header';
import BurgerConstructor from '../burger-constructor/constructor';
import BurgerIngredients from '../burger-ingredients/ingredients';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details'

//Styles
import styles from './app.module.css';

function App() {
  const [choosedIng, setChoosedIng] = React.useState(null);
  const [orderIsDone, displayOrderIsDone] = React.useState(false);

  return (
    <>
      <div className={styles.main_columns}>
        <BurgerIngredients showIngredDetails={setChoosedIng} />
        <BurgerConstructor doOrder={displayOrderIsDone} />

        <Modal title="Детали ингредиента" isOpen={choosedIng} onClose={() => setChoosedIng(null)}>
          <IngredientDetails card={choosedIng} />
        </Modal>
        <Modal title="Детали заказа" isOpen={orderIsDone} onClose={() => { displayOrderIsDone(false) }}>
          <OrderDetails />
        </Modal>
      </div>
    </>
  );
}

export default App;
