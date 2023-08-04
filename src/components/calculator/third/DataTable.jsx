import { styled } from "styled-components";
import { medium } from "../../../utils/responsive";

const Table = styled.div`
  width: 100%;
  max-width: 800px;
  border: 1.5px solid #999;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  border-bottom: ${(props) => (props.$main ? "1px solid #999" : "none")};
`;

const Box = styled.div`
  overflow-x: scroll;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border: 0.5px solid #999;
  font-size: 1rem;
  font-weight: ${(props) => (props.$main ? "bold" : "normal")};

  ${medium({
    padding: "0.2rem 0.5rem",
  })}
`;

const DataTable = ({ tableRows }) => {
  const list = [
    "Name",
    "Expense",
    "Avg. daily expense",
    "Avg. weekly expense",
    "Avg. monthly expense",
  ];

  return (
    <Table>
      <Row $main>
        {list.map((item, index) => (
          <Box key={index} $main>
            {item}
          </Box>
        ))}
      </Row>
      {tableRows.map((item, index) => (
        <Row key={index}>
          <Box>{item.name}</Box>
          <Box>{item.expense}</Box>
          <Box>{item.avgDailyExpense}</Box>
          <Box>{item.avgWeeklyExpense}</Box>
          <Box>{item.avgMonthlyExpense}</Box>
        </Row>
      ))}
    </Table>
  );
};

export default DataTable;
