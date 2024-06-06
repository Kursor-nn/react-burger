import React, { useEffect } from "react";

//Components
import BurgerConstructor from '../burger-constructor/constructor';
import BurgerIngredients from '../burger-ingredients/ingredients';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details'
import ErrorDetails from '../error-details/error-details'

//Styles
import styles from './app.module.css';

//Redux
import { useDispatch } from 'react-redux';
import { deleteCard } from "../../services/actions/cardActions";
import { displayOrder, clearOrder } from "../../services/actions/orderActions";
import { connect, ConnectedProps } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { loadIngredients } from "../api/backend-api"

const mapStateToProps = (state: any) => ({
  showCardDetails: state.card.show,
  showOrderDetails: state.order.show,
  errorMessage: state.error.message
});

const connector = connect(mapStateToProps);
type AppModalProps = {} & ConnectedProps<typeof connector>;

function App(props: AppModalProps) {
  const { showCardDetails, showOrderDetails, errorMessage } = props;
  const dispatch = useDispatch();

  useEffect(() => loadIngredients(dispatch), []);

  return (
    <>
      <div className={styles.main_columns}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>

        {
          showCardDetails && <Modal title="Детали ингредиента" onClose={() => dispatch(deleteCard())}>
            <IngredientDetails />
          </Modal>
        }
        {
          showOrderDetails && <Modal title="Детали заказа" onClose={() => {
            dispatch(displayOrder(false));
            dispatch(clearOrder());
          }}>
            <OrderDetails />
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
