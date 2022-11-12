import React, { useState } from 'react';
import { StyledBanner } from '../styles/Banner.style';
import LoginDropDown from './LoginDropDown';
import CreateAccountDropDown from './CreateAccountDropDown';
import { StyledNavButton } from '../styles/NavButton.style';

const Banner = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const handleInputToggle = () => {
        setShowSignIn((prevState) => setShowSignIn(!prevState));
        setShowCreateAccount((prevState) => setShowCreateAccount(!prevState));
    };

    return (
        <StyledBanner>
            <nav>
                <div id="form-group">
                    <span id="no-acct">
                        {(showSignIn || showCreateAccount) ? 
                        showSignIn ? (
                            <div>
                                No account?{' '}
                                <span className={'mimic-link'} onClick={handleInputToggle}>
                                    Create one
                                </span>
                            </div>
                        ) : (
                            <div>
                                <span className={'mimic-link'} onClick={handleInputToggle}>
                                    Sign in
                                </span>{' '}
                                instead?
                            </div>
                        ): null}
                    </span>
                    <StyledNavButton disabled={showSignIn || showCreateAccount} onClick={() => setShowSignIn(true)}>
                        {showCreateAccount ? 'Signing Up' : showSignIn ? 'Signing In' : 'Sign In'}
                    </StyledNavButton>
                </div>
            </nav>
            {showCreateAccount && <CreateAccountDropDown />}
            {showSignIn && <LoginDropDown />}

            <section id="hero">
                <img id="logo" src="./images/PlayBank.png" alt="PlayBank Logo" />
                <div id="logo-right">
                    <span id="tech-title"> 🧰 Tech used</span>
                    <ul>
                        <li>
                            <img src="./images/typescript-icon.svg" alt="TypeScript logo" /> Typescript
                        </li>
                        <li>
                            <img src="./images/express.svg" alt="Express logo" /> Express.js
                        </li>
                        <li>
                            <img src="./images/react-query-icon.svg" alt="React Query logo" /> React Query
                        </li>
                        <li>
                            <img src="./images/postgresql.svg" alt="PostgreSQL logo" /> PostgreSQL
                        </li>
                        <li>
                            <img src="./images/ts.png" alt="TypeScript logo" /> TypeORM
                        </li>
                        <li>
                            <img src="./images/react.svg" alt="React logo" /> React
                        </li>
                        <li>
                            <img src="./images/sc.png" alt="Styled Components logo" /> Styled Components
                        </li>
                    </ul>
                </div>
            </section>
        </StyledBanner>
    );
};

export default Banner;
