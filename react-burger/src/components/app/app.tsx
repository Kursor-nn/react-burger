import React, { useEffect } from "react";

//Components
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router";

//Redux
import { useDispatch, useSelector } from 'react-redux';


import { asyncLoadIngredients } from "../../services/asyncActions/asyncApiActions";

import { getAccessToken, getCookie } from "../utils/cookies";
import { ProtectedRoute } from "../../hoc/ProtectedRoute";
//Pages
import MainPage from "../../pages/main-page/main-page";
import RegisterPage from "../../pages/register-page/register-page";
import LoginPage from "../../pages/login-page/login-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
//import IngredientDetailsPage from "../ingredient-details/ingredient-details";
import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";

import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from "react-notifications-component";

import { ERROR_PATH, REGISTER_PATH, LOGIN_PATH, FORGOT_PASSWORD_PATH, RESET_PASSWORD_PATH, PROFILE_PATH, PROFILE_ORDERS_PATH, ORDERS_PATH, INGREDIENT_PATH, MAIN_PATH } from "../utils/constants";
import { asyncLoadUser } from "../../services/asyncActions/asyncUserApiActions";
import OrderPage from "../../pages/order-page/order-page";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { deleteCard } from "../../services/actions/cardActions";
import ModalOverlay from "../modal-overlay/modal-overlay";

function App() {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let background = location.state && location.state.background;

  useEffect(() => {
    dispatch(asyncLoadIngredients())
    dispatch(asyncLoadUser());
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path={MAIN_PATH} element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>} />
        <Route path={REGISTER_PATH} element={<RegisterPage />} />
        <Route path={LOGIN_PATH} element={
          <ProtectedRoute onlyUnAuth>
            <LoginPage />
          </ProtectedRoute>
        } />
        <Route path={FORGOT_PASSWORD_PATH} element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRoute>
        } />
        <Route path={RESET_PASSWORD_PATH} element={
          <ProtectedRoute onlyUnAuth>
            <ResetPasswordPage />
          </ProtectedRoute>
        } />
        <Route path={PROFILE_PATH}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        <Route path={PROFILE_ORDERS_PATH}
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          } />
        <Route path={INGREDIENT_PATH}
          element={
            <IngredientDetailsPage>
              <IngredientDetails />
            </IngredientDetailsPage>
          } />
        <Route path={ERROR_PATH} element={<NotFoundPage />} />
      </Routes>

      {
        background && <Routes >
          <Route
            path={INGREDIENT_PATH}
            element={
              <Modal onClose={() => { {
                dispatch(deleteCard())
                navigate(MAIN_PATH);
              } }} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes >
      }

    </>
  );
}

export default App;
