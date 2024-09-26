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
import {FEED_PATH, MAIN_PATH, PROFILE_PATH} from "../utils/constants";
import cn from "classnames";

function Header() {
  const location = useLocation();

  return (
    <header className={`pt-5 ${styles.header}`}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.list}>
            <li>
              <div className={styles.list_item} >
                <Link data-qa-id="constructor-page" className={styles.link} to={MAIN_PATH}>
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
                <Link className={styles.link} to={FEED_PATH}>
                  <ListIcon type={location.pathname === FEED_PATH ? "primary" : "secondary"} />
                  <p
                      className={cn("text text_type_main-default text_color_inactive", {
                        [styles.active]: location.pathname === FEED_PATH,
                      })}
                  >
                    Лента заказов
                  </p>
                </Link>
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
        <Link data-qa-id="open-private-space" className={"text text_type_main-default"} to={PROFILE_PATH}>
          <span className={cn("text text_type_main-default text_color_inactive", {
            [styles.active]: location.pathname === PROFILE_PATH,
          })}>Личный кабинет</span>


        </Link>
      </div>
    </header>
  );
};

export default Header;
