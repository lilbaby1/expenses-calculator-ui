import { styled } from "styled-components";
import { mobile } from "../../../utils/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  padding: 1rem;
  border-bottom: 2px solid #fff;

  &:hover {
    border-bottom: 2px solid purple;
  }

  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  width: 45px;
  height: 45px;
  border: 2px solid purple;
  color: purple;
  background-color: #fff;
  font-size: 2rem;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #fff;
    background-color: purple;
    transition: all 2s ease;
  }

  &:disabled {
    opacity: 0.5;
    &:hover {
      color: purple;
      background-color: #fff;
    }
    cursor: default;
  }
`;

const Number = styled.div`
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  width: 50px;
  margin: 0 2rem;
`;

const NumberOfMates = ({ numberOfMates, setNumberOfMates }) => {
  return (
    <Container>
      <Wrapper>
        <Button
          onClick={() => setNumberOfMates((num) => num - 1)}
          disabled={numberOfMates <= 2 ? true : false}
        >
          -
        </Button>
        <Number>{numberOfMates}</Number>
        <Button
          onClick={() => setNumberOfMates((num) => num + 1)}
          disabled={numberOfMates >= 4 ? true : false}
        >
          +
        </Button>
      </Wrapper>
    </Container>
  );
};

export default NumberOfMates;
