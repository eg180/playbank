import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AxiosError } from 'axios';
import { StyledSignInSignUpInput } from '../styles/LoginDropDown.style';
import BASEURL from '../utilities/BASEURL';

const LoginDropDown = (props) => {
    const { setShowSignIn, setUser, setUserToken, refreshMemos, refreshIous } = props;
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signInObject: ClientSignUpInterface = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        await axios.post(`${BASEURL}/auth/login`, signInObject).then(res => {
            sessionStorage.setItem("sesh", JSON.stringify(res.data.token))
            sessionStorage.setItem("moi", JSON.stringify({name: res.data.name, sub: res.data.sub}))
            setUserToken(res.data.token)
            setUser({name: res.data.name, sub: res.data.sub});
            navigate('/dashboard')
            refreshMemos();
            refreshIous();
        }).catch((err: AxiosError | Error)  => {
            if (err instanceof AxiosError && err.response.status === 401) {
                toast.warn(`🛡 Double-check your credentials.`, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                })
            } else {
                toast.error(`😵 Something isn't right. Try again later.`, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                })
            }
            
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
