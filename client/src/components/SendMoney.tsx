import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Balance from './Balance';

import { StyledSendMoney } from '../styles/SendMoney.style';
import { StyledNavButton } from '../styles/NavButton.style';
import axios from 'axios';


const SendMoney = () => {
    const navigate = useNavigate();
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
            await axios.post(`http://localhost:5000/api/auth/client/transaction/create/:clientId`, payload, {headers: headerForPost});
            toast.success(`Successfully sent $${amountRef!.current!.value} to account ${sendToRef!.current!.value}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate('/');
            } catch (error) {
                if (error.response.data) {
                    toast.warning(`Insufficient IOU funds.`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                } else {
                    toast.error(`Something went wrong :(`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
            }
        };
		

       
    };
    return (
        <StyledSendMoney>
           <div id="form-container">
           <form onSubmit={handleSubmit}>
           <Balance />
            <input ref={amountRef} type="text" placeholder='Amount'/>
            <input ref={sendToRef} type="text" placeholder="Send to: (ID)" />
            <StyledNavButton type="submit" color='white' bgColor="black">Submit</StyledNavButton>
           </form>
           </div>
           
        </StyledSendMoney>
    );
};

export default SendMoney;
