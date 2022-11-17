import React from "react";
import Footer from "./Footer"

import {StyledLandingMain} from "../styles/LandingPage.style";

const LandingPage = () => {
  return (
    <StyledLandingMain>
      <section id="content"></section>
      <Footer />
    </StyledLandingMain>
  );
};

export default LandingPage;
