import React from "react";

// KIT Components
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Styles
import styles from "./header.module.css";

function Header(props) {

  return (
    <header className={`pt-5 ${styles.header}`}>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.list}>
            <li>
              <div className={styles.list_item} to="/">
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default">Конструктор</span>
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
      <div className={styles.wrapper}>
        <Logo />
      </div>
      <div className={styles.profile_link}>
        <ProfileIcon type="secondary" />
        <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
      </div>
    </header>
  );
};

export default Header;
