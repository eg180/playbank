import React from 'react'
import { StyledBanner } from '../styles/Banner.style'
import { StyledNavButton } from '../styles/NavButton.style'

const Banner = () => {
  return (
    <StyledBanner>
    <nav><StyledNavButton>Sign In</StyledNavButton></nav>
    <section id="hero">
        <img id="logo" src="./images/PlayBank.png" alt="PlayBank Logo" />
        <div id="logo-right">
          <span id="tech-title"> 🧰 Tech used</span>
          <ul>
            <li><img src="./images/typescript-icon.svg" alt="TypeScript logo" /> Typescript</li>
            <li><img src="./images/express.svg" alt="Express logo" /> Express.js</li>
            <li><img src="./images/react-query-icon.svg" alt="React Query logo" /> React Query</li>
            <li><img src="./images/postgresql.svg" alt="PostgreSQL logo" /> PostgreSQL</li>
            <li><img src="./images/ts.png" alt="TypeScript logo" /> TypeORM</li>
            <li><img src="./images/react.svg" alt="React logo" /> React</li>
            <li><img src="./images/sc.png" alt="Styled Components logo" /> Styled Components</li>


          </ul>

        </div>
      </section>
    </StyledBanner>
  )
}

export default Banner