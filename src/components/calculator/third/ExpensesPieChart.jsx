import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { styled } from "styled-components";

//
//
// The component does mount but for some reason does not render in the browser.
//
//

const Container = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div``;

const ExpensesPieChart = () => {
  console.log("ExpensesPieChart did mount");

  const expenses = [432, 532, 632, 420, 381];
  const data = [
    {
      name: "Stef",
      value: expenses[0],
    },
    {
      name: "Dido",
      value: expenses[1],
    },
    {
      name: "Slav",
      value: expenses[2],
    },
    {
      name: "Alex",
      value: expenses[3],
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Container>
      <Wrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {/* {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))} */}
            </Pie>
            <Tooltip formatter={(value) => `Total expense ${value} lv.`} />
          </PieChart>
        </ResponsiveContainer>
      </Wrapper>
    </Container>
  );
};

export default ExpensesPieChart;
