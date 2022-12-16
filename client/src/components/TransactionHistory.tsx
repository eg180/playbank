import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledTransactionHistory, StyledTransactionLine } from '../styles/TransactionHistory.style';


enum TransactionTypeTextEnum {
  transfer = "IOU",
  deposit = 'Deposit',
  withdraw = 'Withdraw'

}
const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);

    function getIcon(transactionType: string): string {
        return transactionType === 'transfer' ? '💸' : 'deposit' ? '🏦' : '👋🏼';
    }

    const getTransactionHistory = async () => {
        const sessionToken: string  = sessionStorage.getItem("sesh") ?? 'notfound';
        const token: string = JSON.parse(sessionToken);
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                const res = await axios.get(`${BASEURL}/auth/client/transaction`, { headers: header });
                setTransactions(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        getTransactionHistory();
    }, []);
    return (
        <StyledTransactionHistory>
            <span id="transaction-title"> Transactions</span>
            <span id="transactions">
                {transactions.map((transaction: any, index) => {
                    return (
                        <StyledTransactionLine className={'transaction-line'} bgColor={index % 2 === 0 ? '#809bce' : '#95b8d1'}>
                            <span className={'transaction-type'}>{transaction.type}</span>
                            {getIcon(transaction.type)} ${transaction.amount}
                        </StyledTransactionLine>
                    );
                })}
            </span>
        </StyledTransactionHistory>
    );
};

export default TransactionHistory;
