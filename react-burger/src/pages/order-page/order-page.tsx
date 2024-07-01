import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { MAIN_PATH } from "../../components/utils/constants";

import cn from "classnames"

import styles from "./order-page.module.css"

const OrderPage = () => {
  return (
    <main className="not-found">
      <div className={cn(styles.container, "pt-20")}>
        <p className="text text_type_main-medium mt-9">Ты кто такой?</p>
        <InfoIcon type="error" />
        <p className="text text_type_main-default mt-6">нет тут ни какой истории.</p>
        <Link to={MAIN_PATH} className="not-found__link page__link">
          <p className="text text_type_main-default text_color_inactive mt-2 pb-20">
            Пойду-ка я своей дорогой.
          </p>
        </Link>
      </div>
    </main>
  )
};

export default OrderPage;
