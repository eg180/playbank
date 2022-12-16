import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Balance from './Balance';

import { StyledSendMoney } from '../styles/SendMoney.style';
import { StyledNavButton } from '../styles/NavButton.style';
import axios from 'axios';

const SendMoney = (props: {refreshMemos: () => void}) => {
    const { refreshMemos } = props;
    const [isMemo, setIsMemo] = useState<any>(false);
    const [showMemoInput, setShowMemoInput] = useState<any>(false);
    const navigate = useNavigate();
    const sendToRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const memoRef = useRef<HTMLInputElement>(null);


    const toggleChecked = ()  => {
        setIsMemo(!isMemo)
        setShowMemoInput(!showMemoInput)
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        let token: string | null = JSON.parse(sessionStorage.getItem('sesh')) ?? 'notfound';
        if (token !== 'notfound') {
            const headerForPost = { Authorization: `${token}` };
            const payload = isMemo ? {
                type: 'reminder',
                amount: amountRef?.current?.value,
                memo: memoRef?.current?.value
            } : {
                type: 'transfer',
                amount: amountRef?.current?.value,
                transferred_to: sendToRef?.current?.value,
            };
            try {
                await axios.post(`http://localhost:5000/auth/client/transaction/create`, payload, {
                    headers: headerForPost,
                });
                const toastMessage = isMemo ? "IOU reminder created!" : `Successfully sent $${amountRef!.current!.value} to account ${sendToRef!.current!.value}`;
                toast.success(
                    toastMessage,
                    {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    },
                );
                navigate('/');
                refreshMemos();
            } catch (error) {
                if (error.response.data) {
                    toast.warning(`Insufficient IOU funds.`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else {
                    toast.error(`Something went wrong :(`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            }
        }
    };
    return (
        <StyledSendMoney>
            <div id="form-container">
                <form onSubmit={handleSubmit}>
                    <Balance />
                    <input ref={amountRef} type="text" placeholder="$" />
                    <label>Reminder Only 📝
                    <input type="checkbox" checked={isMemo} onChange={toggleChecked} />
                    </label>
                    {!isMemo && <input ref={sendToRef} type="text" placeholder="Send to: (ID)" />}
                    {isMemo && 
                    <input ref={memoRef} type="text" placeholder="Memo" />}                    
                    <StyledNavButton type="submit" color="white" bgColor="black">
                        Send IOU
                    </StyledNavButton>
                </form>
            </div>
        </StyledSendMoney>
    );
};

export default SendMoney;
