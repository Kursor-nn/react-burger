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

        {
          choosedIng && <Modal title="Детали ингредиента" onClose={() => setChoosedIng(null)}>
            <IngredientDetails card={choosedIng} />
          </Modal>
        }
        {
          orderIsDone && <Modal title="Детали заказа" onClose={() => { displayOrderIsDone(false) }}>
            <OrderDetails orderId="666666" />
          </Modal>
        }
      </div>
    </>
  );
}

export default App;
