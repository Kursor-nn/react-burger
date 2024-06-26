import { useNavigate } from "react-router";
import Form from "../../components/form/form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { resetPassword } from "../../services/asyncActions/asyncUserApiActions";
import { LOGIN_PATH } from "../../components/utils/constants";
import { useDispatch } from "react-redux";

const ResetPasswordPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword(values.password, values.code, () => { navigate(LOGIN_PATH) }))
  };

  return (
    <main>
      <Form title="Изменение пароля"
        buttonText="Сохранить"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors} />
    </main>
  );
};

export default ResetPasswordPage;
