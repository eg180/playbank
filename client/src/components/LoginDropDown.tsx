import React, { useRef } from 'react';
import axios from 'axios';
import { StyledSignInSignUpInput } from '../styles/LoginDropDown.style';

const LoginDropDown = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleSubmit = (e) => {
        console.log('in handle submit')
        e.preventDefault();
        const signInObject: ClientSignUpInterface = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        axios.post(`http://localhost:5000/api/auth/login`, signInObject);
    };

    return (
        <StyledSignInSignUpInput>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Emdail" ref={emailInputRef} />
                <input type="text" placeholder="Password" ref={passwordInputRef} />
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </StyledSignInSignUpInput>
    );
};

export default LoginDropDown;
