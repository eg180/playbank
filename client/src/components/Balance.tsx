import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledBalance } from '../styles/Balance.style'




const Balance = () => {
  const [balance, setBalance] = useState<number>(0);

  const getBalance = async () => {
    let token: string = JSON.parse(sessionStorage.getItem("sesh")) ?? 'notfound';
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
            const res = await axios.get(`${BASEURL}/api/auth/client/balance`,  {headers: header});
            console.log(res.data);
            setBalance(res.data.balance.balance);
            } catch (error) {
                console.log(error);
            }
  }
}
  
  useEffect(() => {
    getBalance();
  }, [])
  return (
    <StyledBalance><span id="balance-title">{' '}Balance:</span><span id='balance'>{' '}${balance}</span></StyledBalance>
  )
}

export default Balance;