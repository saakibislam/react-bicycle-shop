import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import Banner from "./Banner";
import BestSeller from "./BestSeller";
import Feedback from "./Feedback";
import News from "./News";

const Homepage = () => {
  return (
    <>
      <Navigation></Navigation>
      <Banner></Banner>
      <BestSeller></BestSeller>
      <Feedback></Feedback>
      <News></News>
      <Footer></Footer>
    </>
  );
};

export default Homepage;
