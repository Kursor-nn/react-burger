import React, {useEffect} from "react";

//Components
import {Route, Routes, useLocation, useNavigate} from "react-router";

import {asyncLoadIngredients} from "../../services/asyncActions/asyncApiActions";
import {ProtectedRoute} from "../../hoc/ProtectedRoute";
//Pages
import MainPage from "../../pages/main-page/main-page";
import RegisterPage from "../../pages/register-page/register-page";
import LoginPage from "../../pages/login-page/login-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";

import 'react-notifications-component/dist/theme.css'
import {ReactNotifications} from "react-notifications-component";

import {
    ERROR_PATH,
    FEED_ITEM_PATH,
    FEED_PATH,
    FORGOT_PASSWORD_PATH,
    INGREDIENT_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    PROFILE_ORDER_PATH,
    PROFILE_ORDERS_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    RESET_PASSWORD_PATH
} from "../utils/constants";
import {asyncLoadUser} from "../../services/asyncActions/asyncUserApiActions";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {deleteCard} from "../../services/actions/cardActions";

import {getAccessToken} from "../utils/cookies";
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import FeedItemPage from "../../pages/feed-item-page/feed-item-page";
import FeedPage from "../../pages/feed-page/feed-page";
import HistoryPage from "../../pages/history-page/history-page";
import OrderFullInfo from "../order-info/order-full-info";
import {UserType} from "../../services/actions/userActions";

function App() {
    const dispatch: any = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const background = location.state && location.state.background;
    const userDataIsFilled: UserType = useTypedSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(asyncLoadIngredients())
        if (getAccessToken()) {
            dispatch(asyncLoadUser());
        }
    }, [userDataIsFilled]);

    return (
        <>
            <ReactNotifications/>
            <Routes location={background || location}>
                <Route path={MAIN_PATH} element={
                    <ProtectedRoute commonAccess>
                        <MainPage/>
                    </ProtectedRoute>}/>
                <Route path={REGISTER_PATH} element={<RegisterPage/>}/>
                <Route path={LOGIN_PATH} element={
                    <ProtectedRoute onlyUnAuth>
                        <LoginPage/>
                    </ProtectedRoute>
                }/>
                <Route path={FORGOT_PASSWORD_PATH} element={
                    <ProtectedRoute onlyUnAuth>
                        <ForgotPasswordPage/>
                    </ProtectedRoute>
                }/>
                <Route path={RESET_PASSWORD_PATH} element={
                    <ProtectedRoute onlyUnAuth>
                        <ResetPasswordPage/>
                    </ProtectedRoute>
                }/>
                <Route path={PROFILE_PATH}
                       element={
                           <ProtectedRoute>
                               <ProfilePage/>
                           </ProtectedRoute>
                       }/>
                <Route path={PROFILE_ORDERS_PATH}
                       element={
                           <ProtectedRoute background={background}>
                               <HistoryPage/>
                           </ProtectedRoute>
                       }/>
                <Route path={INGREDIENT_PATH}
                       element={
                           <IngredientDetailsPage>
                               <IngredientDetails/>
                           </IngredientDetailsPage>
                       }/>
                <Route path={ERROR_PATH} element={<NotFoundPage/>}/>
                <Route path={FEED_PATH} element={<FeedPage/>}/>
                <Route path={FEED_ITEM_PATH} element={<FeedItemPage/>}/>
                <Route path={PROFILE_ORDER_PATH}
                       element={
                           <ProtectedRoute>
                               <OrderFullInfo/>
                           </ProtectedRoute>
                       }
                />
            </Routes>

            {
                background && <Routes>
                    <Route
                        path={INGREDIENT_PATH}
                        element={
                            <Modal onClose={() => {
                                dispatch(deleteCard())
                                navigate(MAIN_PATH);
                            }} title="Детали ингредиента">
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            }
            {background && (
                <Routes>
                    <Route
                        path={FEED_ITEM_PATH}
                        element={
                            <Modal onClose={() => {
                                dispatch(deleteCard())
                                navigate(-1);
                            }} title="">
                                <FeedItemPage/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
            {background && (
                <Routes>
                    <Route
                        path={PROFILE_ORDER_PATH}
                        element={
                            <Modal onClose={() => {
                                //dispatch(deleteCard())
                                navigate(-1);
                            }} title="Детали заказа">
                                <OrderFullInfo/>
                            </Modal>
                        }
                    />
                </Routes>
            )}

        </>
    );
}

export default App;
