import React, { useRef } from 'react';
import axios from "axios";
import {ClientSignUpInterface} from "../../../api/types/client"
import { StyledLoginDropDown } from '../styles/LoginDropDown.style';

const LoginDropDown = () => {
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();


    const handleSubmit = (e) => {
      e.preventDefault();
      const signUpObject: ClientSignUpInterface = {
        firstName: firstNameInputRef.current.value,
        lastName: lastNameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value
      }
      return console.log(signUpObject);
      axios.post(`http://localhost:5000/api/auth/client/create`, signUpObject)
    
    }

    return (
        <StyledLoginDropDown>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" ref={firstNameInputRef} />
                <input type="text" placeholder="Last Name" ref={lastNameInputRef} />
                <input type="text" placeholder="Email" ref={emailInputRef} />
                <input type="text" placeholder="Password" ref={passwordInputRef} />
                <input type="text" placeholder="Confirm Password" ref={passwordConfirmInputRef} />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </StyledLoginDropDown>
    );
};

export default LoginDropDown;
