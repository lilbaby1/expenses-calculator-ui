import { useState } from "react";

import useFormContext from "../../hooks/useFormContext";
import AmountPaid from "./second/AmountPaid";
import IndividualExpenses from "./second/IndividualExpenses";
import JointExpenses from "./second/JointExpenses";

import { calculateExpenses } from "../../utils/calculations";
import { generateJointExpensesModel } from "../../utils/combinations";

import { styled } from "styled-components";
import { medium, mobile } from "../../utils/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1800px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding: 1rem 1.5rem;

  ${medium({
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "900px",
  })}

  ${mobile({
    padding: 0,
  })}
`;

const Expenses = styled.section`
  flex: 3;
  ${medium({
    width: "100%",
    maxWidth: "900px",
  })}
`;

export const Title = styled.h2`
  ${medium({
    fontSize: "2rem",
  })}

  ${mobile({
    fontSize: "1.5rem",
  })}
`;

const Calculations = styled.section`
  flex: 1;
  height: fit-content;
  min-height: 400px;
  max-height: 80vh;
  overflow-y: scroll;
  position: sticky;
  top: 80px;
  border: 2px solid purple;
  border-radius: 1rem;
  padding: 2rem 1rem;

  ${medium({
    // flex: "content",
    width: "100%",
    maxWidth: "836px",
    minHeight: "fit-content",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: "0px",
  })}
`;

const Button = styled.button`
  ${medium({
    position: "absolute",
    top: "2rem",
    right: "1rem",
    margin: "0",
  })}

  @media screen and (max-width: 600px) {
    position: relative;
    top: 0;
    right: 0;
  }
`;

const CalcSection = styled.section`
  width: fit-content;
  max-width: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  ${medium({
    width: "100%",
    maxWidth: "100%",
  })}
`;

const SummaryTitle = styled.h3`
  width: 100%;
`;
const ItemsContainer = styled.div`
  display: "flex";
  flex-direction: column;
  ${medium({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  })}
`;

const SummaryItem = styled.div`
  border-bottom: 2px solid #777;
  max-width: fit-content;
  ${medium({
    borderBottom: "none",
  })}
`;

const SecondFormPage = ({ handlePrev, handleNext }) => {
  const { matesList, setMatesList, calculations, setCalculations } =
    useFormContext();
  const [canRecalculate, setRecalculate] = useState(false);
  const [jointSection, setJointSection] = useState(matesList.length > 2);
  let jointExpensesModel;

  if (jointSection) {
    jointExpensesModel = generateJointExpensesModel(matesList.length - 1);
  }

  const [jointExpenses, setJointExpenses] = useState(jointExpensesModel);

  const handleGoBack = () => {
    setMatesList([]);
    setCalculations();
    handlePrev();
  };

  return (
    <Container>
      <Wrapper>
        <Expenses>
          <button onClick={handleGoBack}>{"< Go Back"}</button>
          <Title>Amount paid by each roommate</Title>
          {matesList.map((mate, index) => (
            <AmountPaid
              key={`AP_${index}`}
              name={mate.name}
              mate={mate}
              index={index}
              setMatesList={setMatesList}
            />
          ))}

          <Title>Individual expenses of every roommate</Title>
          {matesList.map((mate, index) => (
            <IndividualExpenses
              key={`IE_${index}`}
              name={mate.name}
              mate={mate}
              index={index}
              setMatesList={setMatesList}
            />
          ))}

          {jointSection && (
            <JointExpenses
              jointExpenses={jointExpenses}
              setJointExpenses={setJointExpenses}
            />
          )}
        </Expenses>

        <Calculations>
          <Title>Calculations:</Title>
          <Button
            onClick={() => {
              setCalculations(calculateExpenses(matesList, jointExpenses));
              setRecalculate(true);
            }}
          >
            {canRecalculate ? "Re-calculate" : "Calculate"} Expenses
          </Button>
          {/*           




           */}
          {typeof calculations !== "undefined" && calculations?.error && (
            <p>{calculations.error}</p>
          )}
          {typeof calculations !== "undefined" && !calculations.error && (
            <CalcSection>
              <SummaryTitle>Summary</SummaryTitle>
              {/* Expenses Total and Shared */}
              <ItemsContainer>
                <SummaryItem>
                  <p>Total Expenses {calculations.totalExpenses}</p>
                  <p>Shared Expenses {calculations.sharedExpenses}</p>
                </SummaryItem>

                {/* Expenses by Roommate */}
                <SummaryItem>
                  {matesList.map((mate, index) => (
                    <p key={`IE${index}`}>
                      Expenses {mate.name}:{" "}
                      {calculations.individualExpenses[index]}
                    </p>
                  ))}
                </SummaryItem>

                {/* Messages */}
                <SummaryItem>
                  {matesList.map((mate, index) => (
                    <p key={`M${index}`}>
                      {mate.name} {calculations.messages[index]}
                    </p>
                  ))}
                </SummaryItem>
              </ItemsContainer>

              <button onClick={handleNext}>Save Calculations</button>
            </CalcSection>
          )}
        </Calculations>
      </Wrapper>
    </Container>
  );
};

export default SecondFormPage;
