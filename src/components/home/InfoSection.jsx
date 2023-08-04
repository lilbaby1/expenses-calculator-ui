import { styled } from "styled-components";
import { medium, mobile } from "../../utils/responsive";

const Container = styled.section`
  width: 100%;
  height: 80vh;

  ${medium({
    height: "fit-content",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2rem;

  ${medium({
    flexDirection: "column",
    gap: "2rem",
  })}
`;

const ImageWrap = styled.div`
  flex: 1;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  border-radius: 1rem;

  ${mobile({
    width: "100%",
  })}
`;

const Img = styled.img`
  width: 100%;
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 2rem;

  ${medium({
    margin: 0,
  })}
`;

const Topline = styled.p`
  color: purple;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  ${mobile({
    fontSize: "1rem",
  })}
`;

const Desc = styled.p`
  margin: 0;
  margin-bottom: 1rem;

  ${mobile({
    fontSize: "0.9rem",
  })}
`;

const InfoSection = ({ data, image, imgLeft }) => {
  return (
    <Container>
      <Wrapper>
        {imgLeft && (
          <ImageWrap>
            <Img src={image} />
          </ImageWrap>
        )}
        <TextWrapper>
          {data.map((obj, index) => (
            <div key={index}>
              <Topline>{obj.title}</Topline>
              <Desc>{obj.desc}</Desc>
            </div>
          ))}
        </TextWrapper>
        {!imgLeft && (
          <ImageWrap>
            <Img src={image} />
          </ImageWrap>
        )}
      </Wrapper>
    </Container>
  );
};

export default InfoSection;
