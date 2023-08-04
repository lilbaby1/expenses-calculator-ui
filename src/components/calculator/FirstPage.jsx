import { useState } from "react";

import useFormContext from "../../hooks/useFormContext";
import Calendar from "./first/Calendar";
import NumberOfMates from "./first/NumberOfMates";

import { styled } from "styled-components";
import { mobile } from "../../utils/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  min-height: calc(100vh - 70px);
  align-items: center;
  border: 2px solid #bbb;
  border-radius: 2rem;
  padding: 2rem;

  ${mobile({ padding: "1rem", border: "none" })}
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  ${mobile({ fontSize: "1.5rem" })}
`;

const NameInput = styled.input`
  margin: 1rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  color: purple;
  border: none;
  outline: none;
  border-bottom: 2px solid purple;
  overflow-y: scroll;
`;

const Button = styled.button`
  justify-self: end;
`;

const FirstFormPage = ({ handleNext }) => {
  const { setMatesList, setTimePeriod } = useFormContext();

  // Number of roommates state
  const [numberOfMates, setNumberOfMates] = useState(2);
  const [errMessage, setErrMessage] = useState("");

  let nameInputs = [];

  for (let i = 0; i < numberOfMates; i++) {
    nameInputs.push(
      <NameInput
        key={`key${i}`}
        id={`input${i}`}
        type="text"
        placeholder={`${i + 1}. Enter roommate name`}
      />
    );
  }

  const nextPage = () => {
    // Check if there is an empty input for a roommate name
    for (let i = 0; i < nameInputs.length; i++) {
      let currentInput = document.getElementById(`input${i}`);
      if (currentInput.value === "") {
        setErrMessage(
          "Please make sure you've entered the name of every roommate."
        );
        return;
      }
    }

    for (let i = 0; i < nameInputs.length; i++) {
      let currentInput = document.getElementById(`input${i}`);

      // Check if there are duplicate names for roommates
      let duplicatedNames = nameInputs.filter(
        (input, index) =>
          document.getElementById(`input${index}`).value === currentInput.value
      );
      if (duplicatedNames.length > 1) {
        setErrMessage("Please make sure there are no duplicate names.");
        return;
      }

      // Add roommate to the matesList
      setMatesList((prev) => [
        ...prev,
        {
          name: currentInput.value,
          amountPaid: 0,
          individualExpenses: 0,
          jointExpenses: 0,
        },
      ]);
    }
    setErrMessage("");
    handleNext();
  };

  // const handleClick = () => {
  //   const result = nextStep(nameInputs);
  //   if (result) {
  //     console.log(matesList);
  //     console.log(`Page ${page}`);
  //   }
  // };

  return (
    <Container>
      <Wrapper>
        <Title>
          Select a date range between your oldest and newest expense
        </Title>
        <Calendar setTimePeriod={setTimePeriod} />
        <Title>Choose a number of roommates</Title>
        <NumberOfMates
          numberOfMates={numberOfMates}
          setNumberOfMates={setNumberOfMates}
        />
        <Title>Enter the names of roommates:</Title>
        {nameInputs}
        {errMessage ? <p>{errMessage}</p> : null}
        <Button onClick={() => nextPage()}>Next</Button>
      </Wrapper>
    </Container>
  );
};

export default FirstFormPage;
