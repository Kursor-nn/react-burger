import React, {FormEvent, useEffect} from "react";
import styles from "./history-page.module.css";
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import {closeTheConnection, getUserOrders} from "../../services/actions/wsActions";
import OrderCard from "../../components/order-card/order-card";
import {NavLink, useNavigate} from "react-router-dom";
import cn from "classnames";
import {MAIN_PATH, PROFILE_ORDERS_PATH, PROFILE_PATH} from "../../components/utils/constants";
import {asyncLogout} from "../../services/asyncActions/asyncUserApiActions";

const HistoryPage = () => {
    const userOrders = useTypedSelector((state) => state.ws.data[0]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserOrders());
        return () => {
            dispatch(closeTheConnection());
        };
    }, []);

    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
                <nav className={styles.menu}>
                    <NavLink
                        className={({isActive}) =>
                            cn(styles.link, "text text_type_main-medium text_color_inactive")
                        }
                        to={PROFILE_PATH}>
                        <p>Профиль</p>
                    </NavLink>
                    <NavLink to={PROFILE_ORDERS_PATH}
                             className={({isActive}) =>
                                 cn(styles.link, "text text_type_main-medium text_color_inactive", {[styles.selected]: isActive,})
                             }>
                        <p>История заказов</p>
                    </NavLink>
                </nav>
                <button className={cn(styles.button, "text text_type_main-medium text_color_inactive")}
                        type="button"
                        onClick={(env: FormEvent) => {
                            env.preventDefault()
                            dispatch(asyncLogout(() => {
                                navigate(MAIN_PATH)
                            }))
                        }}>
                    <p>Выход</p>
                </button>
                <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>
                    В этом разделе вы можете посмотреть историю заказов
                </p>
            </div>
            <div className={styles.historyCardsWrapper}>
                <ul className={styles.historyCardContainer}>
                    {
                        userOrders?.orders.length ?
                            (userOrders?.orders?.map((item) => {
                                return <OrderCard key={item.number} item={item} status={true}/>;
                            })) :
                            <div className={cn("text text_type_main-small text_color_inactive")}>
                                Заказы загружаются
                            </div>
                    }
                </ul>
            </div>
        </main>
    );
};

export default HistoryPage;
