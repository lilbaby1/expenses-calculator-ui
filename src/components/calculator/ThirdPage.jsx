import useFormContext from "../../hooks/useFormContext";
import DataTable from "./third/DataTable";
import ExpensesBarChart from "./third/ExpensesBarChart";

import { differenceInDays } from "date-fns";

import { styled } from "styled-components";
import { medium } from "../../utils/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 2rem;

  ${medium({
    flexDirection: "column",
  })}
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${medium({
    marginBottom: "2rem",
  })}
`;

const ThirdFormPage = () => {
  const { matesList, timePeriod, calculations } = useFormContext();

  const starDate = timePeriod.startDate.toLocaleString();
  const endDate = timePeriod.endDate.toLocaleString();

  const daysInTimePeriod = differenceInDays(
    timePeriod.endDate,
    timePeriod.startDate
  );

  // Formating data for DataТable component
  let tableRows = [];
  let barChartData = [];

  matesList.forEach((mate, index) => {
    let expense = calculations.individualExpenses[index];
    let avgDailyExpense = (expense / daysInTimePeriod).toFixed(2);
    let avgWeeklyExpense = (avgDailyExpense * 7).toFixed(2);
    let avgMonthlyExpense = (avgDailyExpense * 30).toFixed(2);

    let row = {
      name: mate.name,
      expense,
      avgDailyExpense,
      avgWeeklyExpense,
      avgMonthlyExpense,
    };
    tableRows.push(row);

    let barChartItem = {
      name: mate.name,
      "Total Expense": expense,
      "Daily Expense": avgDailyExpense,
      "Weekly Expense": avgWeeklyExpense,
      "Monthly Expense": avgMonthlyExpense,
    };
    barChartData.push(barChartItem);
  });

  return (
    <Container>
      <Wrapper>
        <TableWrapper>
          <h4>
            Summary of the expenses for the {daysInTimePeriod}-day the time
            period:
          </h4>
          <p>
            From {starDate} To {endDate}
          </p>
          <DataTable tableRows={tableRows} />
        </TableWrapper>
        <ExpensesBarChart barChartData={barChartData} />
      </Wrapper>
    </Container>
  );
};

export default ThirdFormPage;
