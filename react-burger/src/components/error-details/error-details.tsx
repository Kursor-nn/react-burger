// KIT Components 
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

//Styles
import styles from "./error-details.module.css";

//PropTypes
import PropTypes from 'prop-types';

export interface ErrorDetailsType {
    message: string
}

function ErrorDetails({ message }: ErrorDetailsType) {
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mt-9">{message}</p>
            <InfoIcon type="error" />
            <p className="text text_type_main-default mt-6">Ваш заказ не начнут готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 pb-20">
                Не дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

ErrorDetails.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorDetails;
