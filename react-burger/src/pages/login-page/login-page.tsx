//React
import { useNavigate } from "react-router";

//Components
import Form from "../../components/form/form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { MAIN_PATH } from "../../components/utils/constants";
import { asyncLogin } from "../../services/asyncActions/asyncUserApiActions";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { FormEvent } from "react";

const LoginPage = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(asyncLogin(values.email!!, values.password!!, () => { navigate(MAIN_PATH); }));
  };

  return (
    <main>
      <Form data-qa-id="login-button" title="Вход" buttonText="Войти" handleSubmit={handleSubmit} handleChange={handleChange} values={values} isValid={isValid} errors={errors} />
    </main>
  );
};

export default LoginPage;
