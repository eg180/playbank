import React, { useRef } from 'react';
import axios from 'axios';
import { StyledSignInSignUpInput } from '../styles/LoginDropDown.style';
import BASEURL from 'src/utilities/BASEURL';

const CreateAccountDropDown = (props) => {
    const { setShowCreateAccount } = props;
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const signUpObject = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
        };
        
        try {
             await axios.post(`${BASEURL}/auth/signup`, signUpObject);
             console.log('sign up successful!');

        } catch (error) {
            console.log("Boo. Something didn't quite go as planned.");
        }
        setShowCreateAccount(false);
    };

    return (
        <StyledSignInSignUpInput>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" ref={firstNameInputRef} />
                <input type="text" placeholder="Last Name" ref={lastNameInputRef} />
                <input type="text" placeholder="Email" ref={emailInputRef} />
                <input type="password" placeholder="Password" ref={passwordInputRef} />
                <input type="password" placeholder="Confirm Password" ref={passwordConfirmInputRef} />
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </StyledSignInSignUpInput>
    );
};

export default CreateAccountDropDown;
