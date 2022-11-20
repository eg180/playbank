import React, {useRef} from 'react';

import { StyledSendMoney } from '../styles/SendMoney.style';
import { StyledNavButton } from '../styles/NavButton.style';
import axios from 'axios';


const SendMoney = () => {
    const sendToRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let token: string = JSON.parse(sessionStorage.getItem("sesh")) ?? 'notfound';
        if (token !== 'notfound') {
            const headerForPost = { Authorization: `${token}` };
            const payload = {
                type: "transfer",
                amount: amountRef?.current?.value,
                transferred_to: sendToRef?.current?.value
            };
            try {
            const res = await axios.post(`http://localhost:5000/api/auth/client/transaction/create/:clientId`, payload, {params: {clientId: 1}, headers: headerForPost});
            console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
		

       
    };
    return (
        <StyledSendMoney>
           <main id="form-container">
            
           <form onSubmit={handleSubmit}>
            <input ref={sendToRef} type="text" placeholder="Send to: (ID)" />
            <input ref={amountRef} type="text" placeholder='Amount'/>
            <StyledNavButton type="submit" color='white' bgColor="black">Submit</StyledNavButton>
           </form>
           </main>
           
        </StyledSendMoney>
    );
};

export default SendMoney;
