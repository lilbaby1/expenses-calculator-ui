import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../utils/responsive";

const Container = styled.header`
  height: 70px;
  z-index: 999;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: purple;
  color: whitesmoke;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  ${mobile({
    fontSize: "2rem",
  })}
`;

const NavLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;

  ${mobile({
    width: "168px",
    fontSize: "1.2rem",
  })}
`;

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <Link to="/">RexTrack </Link>
        </Title>
        <NavLinks>
          <Link to={"/"}>Home</Link>
          <Link to="calculator">Calculator</Link>
        </NavLinks>
      </Wrapper>
    </Container>
  );
};

export default Header;
