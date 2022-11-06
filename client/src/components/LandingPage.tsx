import React from "react";
import Banner from "./Banner";
import Footer from "./Footer"

import {StyledLandingMain} from "../styles/LandingPage.style";

const LandingPage = () => {
  return (
    <StyledLandingMain>
      <Banner />
      <section id="content"></section>
      <Footer />
    </StyledLandingMain>
  );
};

export default LandingPage;
