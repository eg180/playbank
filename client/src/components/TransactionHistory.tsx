import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledTransactionHistory, StyledTransactionLine } from '../styles/TransactionHistory.style';


enum TransactionTypeTextEnum {
  transfer = "IOU",
  deposit = 'Deposit',
  withdraw = 'Withdraw'
}

export enum TransactionTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
    REMINDER = 'reminder'
}

export interface Transaction {
    amount: string;
    created_at: Date;
    id: number,
    reminder_date: Date;
    type: TransactionTypes;
    updated_at: Date;
}

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [hideTransactions, setHideTransactions] = useState<boolean>(true);


    function getIcon(transactionType: string): string {
        if (transactionType === TransactionTypeTextEnum.transfer) {
            return '💸'
        } else if (transactionType === TransactionTypeTextEnum.deposit) {
            return '🏦'
        }
        return '👋🏼'
    }
    function toggleTransactionsVisibility(): void {
        setHideTransactions(!hideTransactions);
    };

    const getTransactionHistory = async () => {
        const sessionToken: string  = sessionStorage.getItem("sesh") ?? 'notfound';
        const token: string = JSON.parse(sessionToken);
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                const res: {data: Transaction[]} = await axios.get(`${BASEURL}/auth/client/transaction`, { headers: header });
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
            <span id="transaction-title" onClick={toggleTransactionsVisibility}>{hideTransactions ? "IOUs 📁" : "IOUs 📂"}</span>
            <span id="transactions">
                {hideTransactions === false && transactions.map((transaction: any, index) => {
                    return (
                        <StyledTransactionLine className={'transaction-line'} bgColor={index % 2 === 0 ? '#809bce' : '#95b8d1'} key={transaction.id}>
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
