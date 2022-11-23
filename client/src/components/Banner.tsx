import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyledBanner } from '../styles/Banner.style';
import LoginDropDown from './LoginDropDown';
import CreateAccountDropDown from './CreateAccountDropDown';
import { StyledNavButton } from '../styles/NavButton.style';

const Banner = () => {
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
    const [user, setUser] = useState<string | undefined>(undefined);

    enum ToggleOptions {
        SignUp = 'signup',
        SignIn = 'signin',
        Cancel = 'cancel',
    }

    const handleInputToggle = (toggleOption: ToggleOptions) => {
        if (toggleOption === ToggleOptions.SignUp) {
            setShowSignIn(false);
            setShowCreateAccount(true);
            return;
        } else if (toggleOption === ToggleOptions.SignIn) {
            setShowSignIn(true);
            setShowCreateAccount(false);
            return;
        } else if (toggleOption === ToggleOptions.Cancel) {
            setShowSignIn(false);
            setShowCreateAccount(false);
        }
    };

    const getUserData = (): string | undefined => {
        try {
            return JSON.parse(sessionStorage.getItem('sesh') ?? '');
        } catch (error) {
            return undefined;
        }
    };

    useEffect(() => {
        console.log('setting user data to this', getUserData());
        setUser(getUserData());
    }, [user]);

    return (
        <StyledBanner>
            <Link to="/">
                <div id="logo">
                    AGAM
                    <span id="sub-logo">As Good As Money</span>
                </div>
            </Link>
            <nav>
                <Link to={'/sendmoney'}>
                    <StyledNavButton bgColor={'#41ead4'} color="black">
                        Send IOU 🏎
                    </StyledNavButton>
                </Link>
                <Link to={'/dashboard'}>
                    <StyledNavButton bgColor={'#41ead4'} color="black">
                        My Dashboard
                    </StyledNavButton>
                </Link>
                {user === undefined && (
                    <div id="form-group">
                        <span id="no-acct">
                            {showSignIn || showCreateAccount ? (
                                showSignIn ? (
                                    <div>
                                        No account?{' '}
                                        <span
                                            className={'mimic-link'}
                                            onClick={() => handleInputToggle(ToggleOptions.SignUp)}
                                        >
                                            Create one
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <span
                                            className={'mimic-link'}
                                            onClick={() => handleInputToggle(ToggleOptions.SignIn)}
                                        >
                                            Sign in
                                        </span>{' '}
                                        instead?
                                    </div>
                                )
                            ) : null}
                        </span>
                        {user === undefined && (
                            <StyledNavButton
                                onClick={() =>
                                    handleInputToggle(
                                        showSignIn || showCreateAccount ? ToggleOptions.Cancel : ToggleOptions.SignIn,
                                    )
                                }
                            >
                                {showSignIn || showCreateAccount ? 'Cancel' : 'Connect'}
                            </StyledNavButton>
                        )}
                    </div>
                )}
            </nav>
            {user === undefined && (
                <div id="inputs">
                    {showCreateAccount && <CreateAccountDropDown setShowCreateAccount={setShowCreateAccount} />}
                    {showSignIn && <LoginDropDown setShowSignIn={setShowSignIn} setUser={setUser} />}
                </div>
            )}
        </StyledBanner>
    );
};

export default Banner;
