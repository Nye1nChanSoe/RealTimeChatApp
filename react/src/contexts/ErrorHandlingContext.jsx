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
  };

  const removeError = (index) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors.splice(index, 1);
      return newErrors;
    });
  };

  useEffect(() => {
    console.log(errors);
    const id = setTimeout(() => {
      if(errors.length > 0) {
        // remove the first item from error array after 10s
        setErrors((prevErrors) => prevErrors.slice(1));
      }
    }, 10000);

    return () => clearTimeout(id);
  }, [errors]);

  return (
    <ErrorHandlingContext.Provider value={{ errors, addError, removeError }}>
      { children }
    </ErrorHandlingContext.Provider>
  );
};
export const useErrorHandlingContext = () => useContext(ErrorHandlingContext);
