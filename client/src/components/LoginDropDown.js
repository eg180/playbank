import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { StyledSignInSignUpInput } from '../styles/LoginDropDown.style';

const LoginDropDown = (props) => {
    const { setShowSignIn, setUser } = props;
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('handling sign in submit');
        e.preventDefault();
        const signInObject: ClientSignUpInterface = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        await axios.post(`http://localhost:5000/api/auth/login`, signInObject).then(res => {
            console.log(res)
            sessionStorage.setItem("sesh", JSON.stringify(res.data.token))
            setUser(JSON.stringify(res.data.token));
            navigate('/dashboard')
        }).catch(err => {
            console.log(err);
        });
        setShowSignIn(false);
    };

    return (
        <StyledSignInSignUpInput>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" ref={emailInputRef} />
                <input type="password" placeholder="Password" ref={passwordInputRef} />
                <button type="submit">
                    Submit
                </button>
            </form>
        </StyledSignInSignUpInput>
    );
};

export default LoginDropDown;
