import React, { useState, useRef } from 'react';
import { StyledLoginDropDown } from '../styles/LoginDropDown.style';

const LoginDropDown = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const showRefValues = (e) => {
      e.preventDefault();
      console.log(emailInputRef.current.value, passwordInputRef.current.value)

    }

    return (
        <StyledLoginDropDown>
            <form action="">
                <input type="text" placeholder="Email" ref={emailInputRef} />
                <input type="text" placeholder="Password" ref={passwordInputRef} />
                <button type="submit" onClick={showRefValues}>Submit</button>
            </form>
        </StyledLoginDropDown>
    );
};

export default LoginDropDown;
