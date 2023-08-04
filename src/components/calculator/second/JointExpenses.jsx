import JointExpense from "./JointExpense";
import { Title } from "../SecondPage";

const JointExpenses = ({ jointExpenses, setJointExpenses, matesList }) => {
  return (
    <>
      <Title>Joint Expenses</Title>
      {jointExpenses.map((expense, index) => (
        <JointExpense
          key={`je${index}`}
          expense={expense}
          index={index}
          setJointExpenses={setJointExpenses}
        />
      ))}
    </>
  );
};

export default JointExpenses;
