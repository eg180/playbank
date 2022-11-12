import React, { useState } from 'react';
import {Link} from "react-router-dom";
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
                <StyledNavButton bgColor={"#41ead4"} color="black">
                        <Link to={"/sendmoney"}>Send IOU 🏎</Link>
                    </StyledNavButton>
                <Link to="/"><span id="logo">as good as money</span></Link>
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
        </StyledBanner>
    );
};

export default Banner;
