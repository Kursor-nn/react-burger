import React, { useEffect, useState } from "react";

//Components
import Header from '../header/header';
import BurgerConstructor from '../burger-constructor/constructor';
import BurgerIngredients from '../burger-ingredients/ingredients';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details'

import { URL } from "../utils/constants.js";

//Styles
import styles from './app.module.css';

function App() {
  const [choosedIng, setChoosedIng] = useState(null);
  const [orderIsDone, displayOrderIsDone] = useState(false);

  const [ingredients, setIngredients] = useState([])


  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <>
      <div className={styles.main_columns}>
        <BurgerIngredients showIngredDetails={setChoosedIng} ingredients={ingredients} />
        <BurgerConstructor doOrder={displayOrderIsDone} ingredients={ingredients} />

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
