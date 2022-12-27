import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledBalance } from '../styles/Balance.style'
import useGetJwtData from 'src/utilities/hooks/useGetJwtData';




const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [hideBalance, setHideBalance] = useState<boolean>(true);

  const token = useGetJwtData();

  const getBalance = async () => {
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
            const res = await axios.get(`${BASEURL}/auth/client/balance`,  {headers: header});
            setBalance(res.data.balance.balance);
            } catch (error) {
              toast.warning(`Could not fetch balance. 💀`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            }
  }
};

function toggleHideBalance() {
  setHideBalance(!hideBalance);
}

function maskedDigits(): string {
  const result = balance.toFixed(2).toString().split('').reduce((cumulative, current) => current === '.' ? cumulative + '.' : cumulative + 'x', 'x');
  return hideBalance === true ? result : balance.toFixed(2).toString();
};
  
  useEffect(() => {
    getBalance();
  }, [])
  return (
    <StyledBalance><span id="balance-title">{' '}Balance:</span><span id='balance' onClick={toggleHideBalance}>{' '}${maskedDigits()}</span></StyledBalance>
  )
}

export default Balance;