import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [matesList, setMatesList] = useState([]);
  const [timePeriod, setTimePeriod] = useState({});
  const [calculations, setCalculations] = useState();

  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider
      value={{
        page,
        setPage,
        matesList,
        setMatesList,
        timePeriod,
        setTimePeriod,
        calculations,
        setCalculations,
        formData,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
