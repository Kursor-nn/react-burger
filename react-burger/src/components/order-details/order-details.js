//Styles
import styles from "./order-details.module.css";
import image from "../../images/done-logo.svg"

//PropTypes
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

function OrderDetails() {
    const orderNumber = useSelector(state => state.order.orderNumber)

    return (
        <div className={styles.container}>
            <h2 className={`text text_type_digits-large mt-9 ${styles.title}`}>{orderNumber}</h2>
            <p className="text text_type_main-medium mt-9">идентификатор заказа</p>
            <img className="mt-15" src={image} alt="Иконка." />
            <p className="text text_type_main-default mt-6">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 pb-20">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;
