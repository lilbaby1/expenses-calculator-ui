import { styled } from "styled-components";

const Container = styled.div`
  width: 385px;
  height: 495px;
  border: 1px solid #777;
  border-radius: 1rem;
  margin: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0.25rem 0.5rem 1rem 0.5rem;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #777; */
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const Img = styled.img`
  width: 100%;
`;

const Topline = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  color: purple;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Desc = styled.p`
  display: flex;
  width: 100%;
  font-size: 1rem;
  padding: 0rem 1rem;
  margin: 0;
  margin-bottom: 1rem;
`;

const BenefitsCard = ({ data }) => {
  return (
    <Container>
      <Wrapper>
        <Topline>{data.title}</Topline>
        <ImageWrap>
          <Img src={data.img} />
        </ImageWrap>
        <Desc>{data.desc}</Desc>
      </Wrapper>
    </Container>
  );
};

export default BenefitsCard;
