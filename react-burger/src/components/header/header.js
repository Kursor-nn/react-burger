// KIT Components
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
//Styles
import styles from "./header.module.css";
import { MAIN_PATH, PROFILE_ORDERS_PATH, PROFILE_PATH } from "../utils/constants";
import cn from "classnames";

function Header() {
  const location = useLocation();

  return (
    <header className={`pt-5 ${styles.header}`}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.list}>
            <li>
              <div className={styles.list_item} to="/">
                <Link className={styles.link} to={MAIN_PATH}>
                  <BurgerIcon type={location.pathname === MAIN_PATH || location === undefined ? "primary" : "secondary"} />
                  <p
                    className={cn("text text_type_main-default text_color_inactive", {
                      [styles.active]: location.pathname === MAIN_PATH,
                    })}
                  >
                    Конструктор
                  </p>
                </Link>
              </div>
            </li>
            <li>
              <div className={styles.list_item}>
                <ListIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.container}>
        <Logo />
      </div>
      <div className={styles.profile_link}>
        <ProfileIcon type={location.pathname === PROFILE_PATH ? "primary" : "secondary"} />
        <Link className={"text text_type_main-default"} to={PROFILE_PATH}>
          <span className={cn("text text_type_main-default text_color_inactive", {
            [styles.active]: location.pathname === PROFILE_PATH,
          })}>Личный кабинет</span>


        </Link>
      </div>
    </header>
  );
};

export default Header;
