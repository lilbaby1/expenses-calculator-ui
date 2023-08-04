// import { useEffect, useState } from "react";
import { FormProvider } from "../context/FormProvider";
import useFormContext from "../hooks/useFormContext";
import FirstFormPage from "../components/calculator/FirstPage";
import SecondFormPage from "../components/calculator/SecondPage";
import ThirdFormPage from "../components/calculator/ThirdPage";

const Form = () => {
  const {
    page,
    setPage,
    matesList,
    timePeriod,
    calculations,
    formData,
    setFormData,
  } = useFormContext();

  const handlePrev = () => setPage((prev) => prev - 1);
  const handleNext = () => setPage((prev) => prev + 1);

  const handleSubmit = () => {
    setFormData({
      roommates: matesList,
      timePeriod,
      calculations,
    });
    console.log(formData);
  };

  return (
    <FormProvider>
      <div>
        {page === 1 ? (
          <FirstFormPage handleNext={handleNext} />
        ) : page === 2 ? (
          <SecondFormPage
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleClick={handleSubmit}
          />
        ) : (
          <ThirdFormPage />
        )}
      </div>
    </FormProvider>
  );
};

export default Form;
