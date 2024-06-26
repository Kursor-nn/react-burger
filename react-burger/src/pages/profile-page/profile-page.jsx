import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./profile-page.module.css"
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { MAIN_PATH, PROFILE_ORDERS_PATH, PROFILE_PATH } from "../../components/utils/constants";
import { asyncLogout } from "../../services/asyncActions/asyncUserApiActions";
import { useDispatch, useSelector } from "react-redux";
import { asyncSaveProfile } from "../../services/asyncActions/asyncUserApiActions";

const ProfilePage = () => {
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [fieldEditing, setFieldEditing] = React.useState({
    name: false,
    email: false,
    password: false,
  });

  const { values, handleChange, errors, isValid, setValues, setErrors } = useFormAndValidation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const resetChange = () => {
    setValues({
      name: user?.name,
      email: user?.email,
      password: user?.password,
    });
    setErrors({});
    setFieldEditing({ name: false, email: false, password: false });
    setButtonVisible(false);
  };

  const saveProfile = () => {
    dispatch(asyncSaveProfile(
      fieldEditing.name ? values.name : null,
      fieldEditing.email ? values.email : null,
      fieldEditing.password ? values.password : null))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonVisible((prev) => !prev);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <NavLink
            className={({ isActive }) =>
              cn(styles.link, "text text_type_main-medium text_color_inactive", { [styles.selected]: isActive, })
            }
            to={PROFILE_PATH} >
            <p>Профиль</p>
          </NavLink>
          <NavLink to={PROFILE_ORDERS_PATH} className={cn(styles.link, "text text_type_main-medium text_color_inactive")} >
            <p>История заказов</p>
          </NavLink>
        </nav>
        <button className={cn(styles.button, "text text_type_main-medium text_color_inactive")}
          type="button"
          onClick={(env) => {
            env.preventDefault()
            dispatch(asyncLogout(() => { navigate(MAIN_PATH) }))
          }}>
          <p>Выход</p>
        </button>
        <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className="ml-15" onSubmit={handleSubmit}>
        <Input type="text"
          placeholder="Имя"
          name="name"
          size="default"
          icon="EditIcon"
          onChange={handleChange}
          value={values?.name || user?.name || ""}
          required error={!!errors?.name}
          errorText={errors?.name}
          minLength={2}
          onFocus={() => {
            setFieldEditing({ name: true, email: false, password: false });
            setButtonVisible((prev) => true);
          }}
        />

        <Input extraClass="mt-6"
          placeholder="Логин"
          name="email"
          size="default"
          type="email"
          icon="EditIcon"
          onChange={handleChange}
          value={values?.email || user?.email || ""}
          required
          error={!!errors.name}
          errorText={errors.name}
          minLength={2}
          onFocus={() => {
            setFieldEditing({ name: true, email: false, password: false });
            setButtonVisible((prev) => true);
          }} />
        <PasswordInput extraClass="mt-6"
          name="password"
          icon="EditIcon"
          onChange={handleChange}
          value={values?.password || user?.password || ""}
          required error={!!errors?.password} errorText={errors?.password}
          minLength={6}
          onFocus={() => {
            setFieldEditing({ name: true, email: false, password: false });
            setButtonVisible((prev) => true);
          }} />

        {buttonVisible && (
          <div className={styles.buttonWrapper}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass="mt-6"
              onClick={resetChange}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mt-6"
              disabled={!isValid && (values?.name || values?.email || values?.password)}
              onClick={saveProfile}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </main>
  );
};

export default ProfilePage;
