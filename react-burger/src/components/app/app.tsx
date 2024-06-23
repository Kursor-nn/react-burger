import React, { useEffect } from "react";

//Components
import { Route, Routes } from "react-router";

//Redux
import { useDispatch } from 'react-redux';


import { asyncLoadIngredients } from "../../services/asyncActions/asyncApiActions";


//Pages
import MainPage from "../../pages/main-page/main-page";
import RegisterPage from "../../pages/register-page/register-page";
import LoginPage from "../../pages/login-page/login-page";
import FogotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import IngredientDetailsPage from "../ingredient-details/ingredient-details";
import NotFoundPage from "../../pages/not-found-page/not-found-page";

function App() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadIngredients())
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<FogotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
