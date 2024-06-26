// Redux 
import { useDispatch } from "react-redux";

//React
import { useNavigate } from "react-router";

//Components
import Form from "../../components/form/form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

// API
import { asyncRegister } from "../../services/asyncActions/asyncUserApiActions";
import { MAIN_PATH } from "../../components/utils/constants";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const registrationCallback = () => {
    navigate(MAIN_PATH)
  }

  const handleSubmit = (evt) => {
    dispatch(asyncRegister(values.email, values.password, values.name, registrationCallback))
    evt.preventDefault();
  };

  return (
    <main>
      <Form title="Регистрация"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors} />
    </main>
  );
};

export default RegisterPage;
