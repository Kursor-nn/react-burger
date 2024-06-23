import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./profile-page.module.css"
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const ProfilePage = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <NavLink
            className={({ isActive }) =>
              cn(styles.link, "text text_type_main-medium text_color_inactive", { [styles.selected]: isActive, })
            }
            to="/profile" >
            <p>Профиль</p>
          </NavLink>
          <NavLink to="/profile/orders" className={cn(styles.link, "text text_type_main-medium text_color_inactive")} >
            <p>История заказов</p>
          </NavLink>
        </nav>
        <button className={cn(styles.button, "text text_type_main-medium text_color_inactive")} type="button">
          <p>Выход</p>
        </button>
        <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className="ml-15" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Имя" name="name" size="default" icon="EditIcon" onChange={handleChange} value={values.name || ""} required error={!!errors.name} errorText={errors.name} minLength={2}/>
        <Input extraClass="mt-6" placeholder="Логин" name="email" size="default"  type="email" icon="EditIcon" onChange={handleChange} value={values.email || ""} required  error={!!errors.name} errorText={errors.name} minLength={2} />
        <PasswordInput extraClass="mt-6" name="password" icon="EditIcon" onChange={handleChange} value={values.password || ""} required error={!!errors.password} errorText={errors.password}
          minLength={6}/>
      </form>
    </main>
  );
};

export default ProfilePage;
