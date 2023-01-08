import React, { useEffect, useState } from 'react';
import TransactionLine from 'src/components/TransactionLine';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledTransactionHistory } from '../styles/TransactionHistory.style';

export enum TransactionTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
    REMINDER = 'reminder',
}

export interface Transaction {
    additional_info?: string;
    due_date?: Date;
    receiver_first_name: string;
    transaction_id: number;
    sender_user_id: number;
    paid: boolean;
    amount: string;
    created_at: Date;
    reminder_date: Date;
    type: TransactionTypes;
    accepted_by_receiver: boolean;
    updated_at: Date;
}

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [hideTransactions, setHideTransactions] = useState<boolean>(true);

    // function getIcon(transactionType: string): string {
    //     if (transactionType === 'transfer') {
    //         return '💸';
    //     } else if (transactionType === 'deposit') {
    //         return '💰';
    //     }
    //     return '📝';
    // }

    function toggleTransactionsVisibility(): void {
        setHideTransactions(!hideTransactions);
    }

    const getTransactionHistory = async () => {
        const sessionToken: string = sessionStorage.getItem('sesh') ?? 'notfound';
        const token: string = JSON.parse(sessionToken);
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                const res: { data: Transaction[] } = await axios.get(`${BASEURL}/auth/client/transaction`, {
                    headers: header,
                });
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
            <span id="transaction-title" onClick={toggleTransactionsVisibility}>
                {hideTransactions ? 'Activity 📁' : 'Activity 📂'}
            </span>
            <span id="transactions">
                {hideTransactions === false &&
                    transactions.map((transaction: Transaction, index) => (
                        <TransactionLine transaction={transaction} index={index} setTransactions={setTransactions} />
                    ))}
            </span>
        </StyledTransactionHistory>
    );
};

export default TransactionHistory;
