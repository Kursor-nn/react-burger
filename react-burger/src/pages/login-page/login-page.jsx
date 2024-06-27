//React
import { useNavigate } from "react-router";
//Redux
import { useDispatch, useSelector } from "react-redux";

//Components
import Form from "../../components/form/form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { MAIN_PATH } from "../../components/utils/constants";
import { asyncLogin } from "../../services/asyncActions/asyncUserApiActions";

const LoginPage = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(asyncLogin(values.email, values.password, () => { navigate(MAIN_PATH); }));
  };

  return (
    <main>
      <Form title="Вход" buttonText="Войти" handleSubmit={handleSubmit} handleChange={handleChange} values={values} isValid={isValid} errors={errors} />
    </main>
  );
};

export default LoginPage;
