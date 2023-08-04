import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { styled } from "styled-components";
import { medium } from "../../../utils/responsive";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  ${medium({
    width: "400px",
    height: "400px",
  })}
`;

const ExpensesBarChart = ({ barChartData }) => {
  const [expenseFrame, setExpenseFrame] = useState("Total Expense");

  useEffect(() => {
    console.log("useEffect ran!");
  }, [expenseFrame]);

  return (
    <Container>
      <Wrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={barChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={expenseFrame} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Wrapper>
      <select onChange={(e) => setExpenseFrame(e.target.value)}>
        <option value={"Total Expense"}>Total</option>
        <option value={"Daily Expense"}>Daily</option>
        <option value={"Weekly Expense"}>Weekly</option>
        <option value={"Monthly Expense"}>Monthly</option>
      </select>
    </Container>
  );
};

export default ExpensesBarChart;
