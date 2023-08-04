import { styled } from "styled-components";
import BenefitsCard from "./BenefitsCard";

const Container = styled.section`
  width: 100%;
  min-height: 80vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const BenefitsSection = ({ data }) => {
  return (
    <Container>
      <Wrapper>
        {data.map((item, index) => (
          <BenefitsCard key={index} data={item} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default BenefitsSection;
