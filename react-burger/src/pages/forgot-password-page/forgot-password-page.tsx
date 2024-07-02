//React
import { useNavigate } from "react-router";

//Components
import Form from "../../components/form/form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { imForgotPassword } from "../../services/asyncActions/asyncUserApiActions";
import { RESET_PASSWORD_PATH } from "../../components/utils/constants";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { FormEvent } from "react";

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(imForgotPassword(values.email!!, () => { navigate(RESET_PASSWORD_PATH) }))
  };

  return (
    <main>
      <Form title="Восстановление пароля"
        buttonText="Восстановить"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors} />
    </main>
  );
};

export default ForgotPasswordPage;
