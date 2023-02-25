import React from "react";
import { StyledFooter } from "../styles/Footer.style";

const Footer = () => {
  return (
    <StyledFooter>
      <span>
        Erick Gonzalez <span><a href="https://gonze.dev" target={"_blank"} rel="noreferrer">gonze.dev</a></span>
        <span id="github-icon">
          <a href="https://github.com/eg180" target={"_blank"} rel="noreferrer"><img src="./images/github-octocat.svg" alt="Erick's Github profile" /></a>
          <a href="https://linkedin.com/in/mrerickgonzalez" target={"_blank"} rel="noreferrer"><img src="./images/linkedin-icon.svg" alt="Erick's Linkedin profile" /></a>

        </span>
      </span>
    </StyledFooter>
  );
};

export default Footer;
