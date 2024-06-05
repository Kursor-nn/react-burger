import React, { useEffect } from "react";

//Components
import BurgerConstructor from '../burger-constructor/constructor';
import BurgerIngredients from '../burger-ingredients/ingredients';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details'
import ErrorDetails from '../error-details/error-details'

import { URL } from "../utils/constants.js";

//Styles
import styles from './app.module.css';

//Redux
import { useDispatch } from 'react-redux';
import { deleteCard } from "../../services/actions/cardActions";
import { displayOrder } from "../../services/actions/orderActions";
import { fillIngredientList } from "../../services/actions/ingredientsActions";
import { setErrorMessage } from "../../services/actions/errorActions"

import { connect, ConnectedProps } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const mapStateToProps = (state: any) => ({
  showCardDetails: state.card.show,
  showOrderDetails: state.order.show,
  ingredients: state.ingredients.ingredients,
  errorMessage: state.error.message
});

const connector = connect(mapStateToProps);
type AppModalProps = {} & ConnectedProps<typeof connector>;

function App(props: AppModalProps) {
  const { showCardDetails, showOrderDetails, ingredients, errorMessage } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch(fillIngredientList(data.data));
      })
      .catch((error) => {
        console.log("Error", error);
        dispatch(setErrorMessage("У нас лапки."))
      });

  }, []);

  return (
    <>
      <div className={styles.main_columns}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor doOrder={() => dispatch(displayOrder(true))} />
        </DndProvider>

        {
          showCardDetails && <Modal title="Детали ингредиента" onClose={() => dispatch(deleteCard())}>
            <IngredientDetails />
          </Modal>
        }
        {
          showOrderDetails && <Modal title="Детали заказа" onClose={() => dispatch(displayOrder(false))}>
            <OrderDetails orderId="666666" />
          </Modal>
        }
        {
          errorMessage && <Modal title="Ужасная ошибка." onClose={() => { }}>
            <ErrorDetails message={errorMessage} />
          </Modal>
        }
      </div>
    </>
  );
}

export default connector(App);
