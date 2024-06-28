//React
import { useNavigate } from "react-router";

//Redux
import { useDispatch } from "react-redux";

//Components
import Form from "../../components/form/form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { imForgotPassword } from "../../services/asyncActions/asyncUserApiActions";
import { RESET_PASSWORD_PATH } from "../../components/utils/constants";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(imForgotPassword(values.email, () => { navigate(RESET_PASSWORD_PATH) }))
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
