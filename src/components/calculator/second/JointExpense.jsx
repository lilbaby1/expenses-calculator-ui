import { useState } from "react";
import { styled } from "styled-components";
import { evaluate } from "mathjs";
import useFormContext from "../../../hooks/useFormContext";
import { Name as Names, Total as TotalAmount } from "./AmountPaid";
import { medium } from "../../../utils/responsive";

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: ${(props) =>
    props.$isSelected ? "0.5rem 2rem 1rem 2rem" : "0.2rem 2rem"};
  transition: padding 0.5s;
  margin: 1rem 0rem;

  ${medium({
    padding: "1.2rem 1rem",
  })}
`;

const InfoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.$isSelected ? "1rem" : "0")};
  transition: margin-bottom 0.5s;
  ${medium({
    paddingRight: "2rem",
  })}
`;

const Total = styled(TotalAmount)`
  margin-left: 2rem;
`;

const Icon = styled.div`
  position: absolute;
  right: 0;
  top: -5px;
  margin-left: 1rem;
  font-size: 2rem;
  rotate: ${(props) => (props.$isSelected ? "-90deg" : "90deg")};
  transition: rotate 0.5s;
  cursor: pointer;
`;

const JointExpensesContainer = styled.div`
  transition: height 0.5s;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    height: ${(props) => (props.$isSelected ? "fit-contentç" : "0")};
  }
`;

const Label = styled.label`
  height: ${(props) => (props.$isSelected ? "30px" : "0")};
  display: ${(props) => (props.$isSelected ? "flex" : "none")};
  transition: display 10s;
  margin: 0;
  margin-right: 2rem;
  height: 100%;
  color: purple;
  font-weight: 500;

  @media screen and (max-width: 900px) {
    font-size: 1.2rem;
    height: fit-content;
  }
`;

const JointSumInput = styled.input`
  height: ${(props) => (props.$isSelected ? "38px" : "0")};
  transition: height 0.1s;
  margin: 0;
  width: 100%;
  display: ${(props) => (props.$isSelected ? "flex" : "none")};
  color: purple;
  border: none;
  outline: none;
  border-bottom: 2px solid purple;
  overflow-y: scroll;

  @media screen and (max-width: 900px) {
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    border-color: ${(props) => (props.$isSelected ? "purple" : "transparent")};
  }
`;

const JointExpense = ({ expense, index, setJointExpenses }) => {
  const { matesList } = useFormContext();
  const [total, setTotal] = useState(expense[1]);
  const [isSelected, setIsSelected] = useState(false);

  const names = [];
  expense[0].forEach((element) => {
    names.push(matesList[element].name);
  });

  const namesStr =
    names.length > 2
      ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1]
      : names.join(" and ");

  const handleChange = (e) => {
    // Check if the input for amount paid is empty.
    // If so, then the amountPaid for the roommate needs to be set to 0.
    if (e.target.value === "") {
      setJointExpenses((prevExp) => {
        let newExpList = prevExp;
        newExpList[index][1] = 0;
        return newExpList;
      });
    } else {
      try {
        const result = evaluate(e.target.value);
        // Check if the results equates to a number.
        if (typeof result !== "number") throw Error;
        setTotal(result.toFixed(2));
        setJointExpenses((prevExp) => {
          let newExp = prevExp;
          newExp[index][1] = result;
          return newExp;
        });
      } catch (error) {
        setTotal("...");
        setJointExpenses((prevExp) => {
          let newExp = prevExp;
          newExp[index][1] = "...";
          return newExp;
        });
      }
    }
  };

  return (
    <Container $isSelected={isSelected}>
      <InfoContainer $isSelected={isSelected}>
        <Names>{namesStr}</Names>
        <Total>
          Total: {typeof total === "number" ? total.toFixed(2) : total}
        </Total>
        <Icon
          $isSelected={isSelected}
          onClick={() => setIsSelected(!isSelected)}
        >
          {">"}
        </Icon>
      </InfoContainer>

      <JointExpensesContainer $isSelected={isSelected}>
        <Label
          $isSelected={isSelected}
          htmlFor={`${names.join("_")}_individual_expenses`}
        >
          Joint Expenses made by {namesStr}:
        </Label>
        <JointSumInput
          $isSelected={isSelected}
          onChange={handleChange}
          id={`${names.join("_")}_individual_expenses`}
          type="text"
          name={`${names.join("_")}_individual_expenses`}
          placeholder="Write the sum of all the joint expenses between these roommates here."
        />
      </JointExpensesContainer>
    </Container>
  );
};

export default JointExpense;
