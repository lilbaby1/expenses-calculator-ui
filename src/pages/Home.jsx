import { styled } from "styled-components";
import InfoSection from "../components/home/InfoSection";
import BenefitsSection from "../components/home/BenefitsSection";
import { medium, mobile } from "../utils/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;

  ${mobile({
    padding: "0rem 1rem",
  })}
`;

const Image = styled.img`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;

  ${medium({
    fontSize: "2.5rem",
  })}

  ${mobile({
    fontSize: "1.8rem",
  })}
`;

const Desc = styled.p`
  max-width: 1100px;
  padding: 0rem 2rem;

  ${mobile({
    fontSize: "1rem",
  })}
`;

const Home = () => {
  const images = [
    require("../images/undraw_data_re_80ws.svg").default,
    require("../images/undraw_vault_re_s4my.svg").default,
    require("../images/main_02.png"),
  ];

  const infoSectionData = [
    {
      title: "Shared Expense Management",
      desc: "Roommates can input their expenses, detailing how much money they have spent during a specified time frame. This includes both shared purchases and individual purchases.",
    },
    {
      title: "Customized Expense Allocation",
      desc: "The app recognizes that roommates may have different preferences and consumption patterns. Users can indicate how much of their expenses are dedicated to their individual preferences, such as specific products or items.",
    },
    {
      title: "Equal Shared Expenses",
      desc: "In situations where two or more roommates have made equal contributions for products that are used by at least one roommate, the app can accurately calculate and account for these shared expenses.",
    },
    {
      title: "Transparent and Fair Calculations",
      desc: "The Roommate Expense Tracker handles complex calculations and ensures fair distribution of expenses based on individual spending and shared costs. It eliminates the need for manual calculations and potential conflicts over uneven expenses.",
    },
    {
      title: "Real-Time Updates",
      desc: "The app updates expense records in real-time, allowing roommates to track their budget and financial status at any given moment.",
    },
    {
      title: "Multi-Roommate Support",
      desc: "The app supports multiple roommates, making it ideal for households with more than two members. Each roommate can input their expenses and preferences independently.",
    },
  ];

  const benefitsSectionData = [
    {
      title: "Shared Expense Management",
      desc: "Roommates can input their expenses, detailing how much money they have spent during a specified time frame. This includes both shared purchases and individual purchases.",
      img: require("../images/undraw_data_re_80ws.svg").default,
    },
    {
      title: "Clear Financial Picture",
      desc: "Roommates gain a transparent view of their collective spending habits, helping them make informed decisions and budget effectively.",
      img: require("../images/undraw_vault_re_s4my.svg").default,
    },
    {
      title: "Equitable Contributions",
      desc: "By considering individual preferences and shared expenses, the app promotes fair financial participation among roommates.",
      img: require("../images/undraw_mobile_payments_re_7udl.svg").default,
    },
    {
      title: "Reduced Conflicts",
      desc: "The Roommate Expense Tracker minimizes potential conflicts arising from unequal expense sharing, creating a harmonious living environment.",
      img: require("../images/undraw_discount_d-4-bd.svg").default,
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Title>Roommate Expense Tracker</Title>
        <ImageWrapper>
          <Image src={images[2]} alt="main" />
        </ImageWrapper>
        <Desc>
          The<b> Roommate Expense Tracker</b> is designed to simplify expense
          calculations and budget tracking for people living together as
          roommates. It offers a convenient solution for managing shared
          expenses, accommodating varying spending habits, and ensuring fair
          contributions from each roommate.
        </Desc>
        <InfoSection
          image={images[0]}
          data={infoSectionData.slice(0, 3)}
          imgLeft
        />
        <BenefitsSection data={benefitsSectionData} />
        <InfoSection image={images[1]} data={infoSectionData.slice(3, 7)} />
      </Wrapper>
    </Container>
  );
};

export default Home;
