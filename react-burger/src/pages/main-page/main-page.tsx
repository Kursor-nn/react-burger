//Redux
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";

//DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//Components
import BurgerIngredients from "../../components/burger-ingredients/ingredients";
import BurgerConstructor from "../../components/burger-constructor/constructor";

import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import ErrorDetails from "../../components/error-details/error-details";

import { deleteCard } from "../../services/actions/cardActions";
import { displayOrder, clearOrder } from "../../services/actions/orderActions";

import { MAIN_PATH } from "../../components/utils/constants";

//Styles
import styles from "../../components/app/app.module.css"

const mapStateToProps = (state: any) => ({
  showCardDetails: state.card.show,
  showOrderDetails: state.order.show,
  errorMessage: state.error.message
});

const connector = connect(mapStateToProps);
type AppModalProps = {} & ConnectedProps<typeof connector>;

const MainPage = (props: AppModalProps) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { showCardDetails, showOrderDetails, errorMessage } = props;

  return (
    <div className={styles.main_columns}>
      <div className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
      {
        showCardDetails && <Modal title="Детали ингредиента" onClose={() => {
          dispatch(deleteCard());
          navigate(MAIN_PATH);
        }}>
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
  );
};

export default connector(MainPage);
