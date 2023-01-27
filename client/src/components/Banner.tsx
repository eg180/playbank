import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyledBanner } from '../styles/Banner.style';
import LoginDropDown from './LoginDropDown';
import CreateAccountDropDown from './CreateAccountDropDown';
import { StyledNavButton } from '../styles/NavButton.style';

const Banner = (props: { refreshMemos: () => void; refreshIous: () => void }) => {
    const { refreshMemos, refreshIous } = props;
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<{ name: string | undefined; sub: string | undefined }>({
        name: undefined,
        sub: undefined,
    });

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
        setUserToken(getUserData());
    }, [userToken]);

    return (
        <StyledBanner>
            <Link to="/">
                <div id="logo">
                    AGAM
                    <span id="sub-logo">As Good As Money</span>
                </div>
            </Link>
            {user?.name && <span id="greeting">{`Hi, ${user.name.toUpperCase() ?? 'user'}`}</span>}
            <nav>
                {userToken && (
                    <Link to={'/sendmoney'}>
                        <StyledNavButton bgColor={'#41ead4'} color="black">
                            New IOU 🏎
                        </StyledNavButton>
                    </Link>
                )}
                {userToken && (
                    <Link to={'/dashboard'}>
                        <StyledNavButton bgColor={'#41ead4'} color="black">
                            My Dashboard
                        </StyledNavButton>
                    </Link>
                )}
                {userToken === undefined && (
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
                        {userToken === undefined && (
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
            {userToken === undefined && (
                <div id="inputs">
                    {showCreateAccount && <CreateAccountDropDown setShowCreateAccount={setShowCreateAccount} />}
                    {showSignIn && (
                        <LoginDropDown
                            setShowSignIn={setShowSignIn}
                            refreshMemos={refreshMemos}
                            refreshIous={refreshIous}
                            setUserToken={setUserToken}
                            setUser={setUser}
                        />
                    )}
                </div>
            )}
        </StyledBanner>
    );
};

export default Banner;
