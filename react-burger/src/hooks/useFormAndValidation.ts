import { useState, useCallback, ChangeEvent } from "react";

export interface FormInfoType {
  email?: string | null
  password?: string | null
  name?: string | null
  code?: string | null
}

export function useFormAndValidation() {
  const [values, setValues] = useState<FormInfoType>({});
  const [errors, setErrors] = useState<FormInfoType>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid((evt.target as any).closest("form").checkValidity())
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors
  };
}
