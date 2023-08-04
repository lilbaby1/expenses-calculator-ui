import { useState, useEffect } from "react";
import styled from "styled-components";
import { evaluate } from "mathjs";
import useFormContext from "../../../hooks/useFormContext";
import { medium, mobile } from "../../../utils/responsive";

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem 0rem;

  ${medium({
    padding: "1.2rem 1rem",
  })}
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  ${mobile({
    marginBottom: "0rem",
  })}
`;

export const Name = styled.h3`
  @media screen and (max-width: 900px) {
    font-size: 1.4rem;
  }
`;

export const Total = styled.h3`
  min-width: 200px;
  /* margin-left: 500px; */
  @media screen and (max-width: 900px) {
    font-size: 1.4rem;
    min-width: fit-content;
  }
`;

export const Label = styled.label`
  margin: 0;
  margin-right: 2rem;
  height: 100%;
  color: purple;
  font-weight: 500;

  @media screen and (max-width: 900px) {
    font-size: 1.2rem;
  }
`;

export const AmountPaidContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SumPaidInput = styled.input`
  margin: 0;
  width: 100%;
  display: flex;
  color: purple;
  border: none;
  outline: none;
  border-bottom: 2px solid purple;
  overflow-y: scroll;

  &:focus {
    border-bottom-color: purple;
    border-bottom: 2px solid purple;
    border-radius: 0;
  }

  &:hover {
    border-bottom-color: purple;
    border-bottom: 2px solid purple;
    border-radius: 0;
  }

  @media screen and (max-width: 900px) {
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
`;

const AmountPaid = ({ index }) => {
  const { matesList, setMatesList } = useFormContext();
  let currentMate = matesList[index];
  const name = currentMate.name;
  const [total, setTotal] = useState(currentMate.amountPaid);

  useEffect(() => {}, [currentMate]);

  const handleChange = (e) => {
    // Check if the input for amount paid is empty.
    // If so, then the amountPaid for the roommate needs to be set to 0.
    if (e.target.value === "") {
      setMatesList((prevList) => {
        let newList = prevList;
        newList[index].amountPaid = 0;
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
          newList[index].amountPaid = result;
          return newList;
        });
      } catch (error) {
        setTotal("...");
        setMatesList((prevList) => {
          let newList = prevList;
          newList[index].amountPaid = "...";
          return newList;
        });
      }
    }
  };

  return (
    <Container>
      <InfoContainer>
        <Name>{name}</Name>
        <Total>Total: {total}</Total>
      </InfoContainer>

      <AmountPaidContainer>
        <Label htmlFor={`${name}_amountPaid`}>Amount paid by roomate:</Label>
        <SumPaidInput
          onChange={handleChange}
          id={`${name}_amountPaid`}
          type="text"
          name={`${name}_amountPaid`}
          placeholder="Write the sum of all bills paid here."
        />
      </AmountPaidContainer>
    </Container>
  );
};

export default AmountPaid;
