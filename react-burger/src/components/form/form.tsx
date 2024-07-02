import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "./form.module.css";
import { Link, useLocation } from "react-router-dom";

import { FORGOT_PASSWORD_PATH, LOGIN_PATH, REGISTER_PATH, RESET_PASSWORD_PATH, } from "../utils/constants";
import {FormInfoType} from "../../hooks/useFormAndValidation";
import {ChangeEvent, FormEvent} from "react";

export interface FormType {
  title: string
  buttonText: string
  values: FormInfoType
  handleSubmit: (evt: FormEvent) => void
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void
  errors: FormInfoType
  isValid: boolean
}

export const Form = ({ title, buttonText, values, handleSubmit, handleChange, errors, isValid }: FormType) => {
  //const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { pathname } = useLocation();

  const isRegisterPage = pathname === REGISTER_PATH;
  const isLoginPage = pathname === LOGIN_PATH;
  const isForgotPasswordPage = pathname === FORGOT_PASSWORD_PATH;
  const isResetPasswordPage = pathname === RESET_PASSWORD_PATH;

  return (
    <>
      <form className={cn(styles.form, "form")} onSubmit={handleSubmit}>
        <h1 className={cn("text text_type_main-medium", styles.title)}>{title}</h1>
        {isRegisterPage && (
          <Input
              type="text"
              extraClass="mt-6"
              placeholder="Имя"
              name="name"
              size="default"
              onChange={handleChange}
              value={values.name || ""}
              required
              error={!!errors.name}
              errorText={errors.name!!}
              minLength={2} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}          />
        )}
        {isRegisterPage || isLoginPage || isForgotPasswordPage ? (
          <Input
              type="email"
              extraClass="mt-6"
              placeholder={isRegisterPage || isLoginPage ? "E-mail" : "Укажите e-mail"}
              name="email"
              size="default"
              onChange={handleChange}
              value={values.email || ""}
              required
              error={!!errors.email}
              errorText={errors.email!!}
              minLength={2} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}          />
        ) : null}
        {isRegisterPage || isLoginPage || isResetPasswordPage ? (
          <Input
              type="password"
              icon="ShowIcon"
              extraClass="mt-6"
              placeholder={isRegisterPage || isLoginPage ? "Пароль" : "Введите новый пароль"}
              name="password"
              size="default"
              onChange={handleChange}
              value={values.password || ""}
              required
              error={!!errors.password}
              errorText={errors.password!!}
              minLength={6} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}          />
        ) : null}
        {isResetPasswordPage && (
          <Input
              extraClass="mt-6"
              type="text"
              placeholder="Введите код из письма"
              name="code"
              size={"default"}
              onChange={handleChange}
              value={values.code || ""}
              required
              error={!!errors.code}
              errorText={errors.code!!}
              minLength={2} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}          />
        )}
        <Button
          extraClass={cn(styles.button, "mt-6")}
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
        >
          {buttonText}
        </Button>
      </form>

      {isRegisterPage && (
        <div className={cn(styles.wrapper, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
          <Link className={styles.link} to={LOGIN_PATH}>
            Войти
          </Link>
        </div>
      )}

      {isLoginPage && (
        <>
          <div className={cn(styles.wrapper, "mt-20")}>
            <p className="text text_type_main-default text_color_inactive">
              Вы - новый пользователь?
            </p>
            <Link className={styles.link} to={REGISTER_PATH}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={cn(styles.wrapper, "mt-4")}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
            <Link className={styles.link} to={FORGOT_PASSWORD_PATH}>
              Восстановить пароль
            </Link>
          </div>
        </>
      )}
      {isForgotPasswordPage || isResetPasswordPage ? (
        <div className={cn(styles.wrapper, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Link className={styles.link} to={LOGIN_PATH}>
            Войти
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Form;
