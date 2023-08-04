import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { evaluate } from "mathjs";
import useFormContext from "../../../hooks/useFormContext";

import {
  Container,
  InfoContainer,
  Label,
  Total,
  AmountPaidContainer as IndividualExpensesContainer,
  SumPaidInput,
} from "./AmountPaid";

const IndividualExpenses = ({ index }) => {
  const { matesList, setMatesList } = useFormContext();
  let currentMate = matesList[index];
  const name = currentMate.name;
  const [total, setTotal] = useState(currentMate.individualExpenses);

  useEffect(() => {}, [currentMate]);

  const handleChange = (e) => {
    // Check if the input for amount paid is empty.
    // If so, then the amountPaid for the roommate needs to be set to 0.
    if (e.target.value === "") {
      setMatesList((prevList) => {
        let newList = prevList;
        newList[index].individualExpenses = 0;
        setTotal(0);
        return newList;
      });
    } else {
      // Is the result from evaluate() is a valid mathematical expression then
      // the amountPaid for the roommate gets set to the result.
      // If evaluate() throws an error then the amountPaid for the roommate gets set to
      // the string "...", so does the total value.
      try {
        const result = evaluate(e.target.value);
        // Check if the results equates to a number.
        if (typeof result !== "number") throw Error;
        setTotal(result.toFixed(2));
        setMatesList((prevList) => {
          let newList = prevList;
          newList[index].individualExpenses = result;
          return newList;
        });
      } catch (error) {
        setTotal("...");
        setMatesList((prevList) => {
          let newList = prevList;
          newList[index].individualExpenses = "...";
          return newList;
        });
      }
    }
  };

  return (
    <Container>
      <InfoContainer>
        <h3>{name}</h3>
        <Total>Total: {total}</Total>
      </InfoContainer>

      <IndividualExpensesContainer>
        <Label htmlFor={`${name}_individual_expenses`}>
          Individual Expenses made by roommate:
        </Label>
        <SumPaidInput
          onChange={handleChange}
          id={`${name}_individual_expenses`}
          type="text"
          name={`${name}_individual_expenses`}
          placeholder="Write the sum of all individual expenses here."
        />
      </IndividualExpensesContainer>
    </Container>
  );
};

export default IndividualExpenses;
