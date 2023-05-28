import { createContext, useContext, useEffect, useState } from "react";

const ErrorHandlingContext = createContext({
  errors: [],
  addError: (error) => {},
  removeError: (index) => {},
});

export const ErrorHandlingContextProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
    setTimeout(() => {
      setErrors((prevErrors) => prevErrors.slice(1));
    }, 10000);
  };

  const removeError = (index) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors.splice(index, 1);
      return newErrors;
    });
  };

  return (
    <ErrorHandlingContext.Provider value={{ errors, addError, removeError }}>
      { children }
    </ErrorHandlingContext.Provider>
  );
};
export const useErrorHandlingContext = () => useContext(ErrorHandlingContext);
