import React, { useRef } from 'react';
import axios from 'axios';
import { StyledSignInSignUpInput } from '../styles/LoginDropDown.style';

const LoginDropDown = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const signInObject: ClientSignUpInterface = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        axios.post(`http://localhost:5000/api/auth/login`, signInObject).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response.data);
        });
    };

    return (
        <StyledSignInSignUpInput>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" ref={emailInputRef} />
                <input type="text" placeholder="Password" ref={passwordInputRef} />
                <button type="submit">
                    Sudbmit
                </button>
            </form>
        </StyledSignInSignUpInput>
    );
};

export default LoginDropDown;
