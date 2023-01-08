import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { Tooltip } from 'antd';
import {
    StyledTransactionAmount,
    StyledTransactionHistory,
    StyledTransactionLine,
    StyledTransactionType,
} from '../styles/TransactionHistory.style';

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
    const amountColor = (transactionType: string, sender_id: number, paid: boolean) =>
        transactionType === TransactionTypes.DEPOSIT
            ? '#00afb9'
            : transactionType === TransactionTypes.TRANSFER && !paid
            ? sender_id === 1
                ? '#fb6f92'
                : '#'
            : 'black';

    function getText(transactionType: string): string {
        if (transactionType === 'transfer') {
            return 'IOU';
        }
        return transactionType.toUpperCase();
    }

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
                    transactions.map((transaction: Transaction, index) => {
                        return (
                            <>
                                <StyledTransactionLine
                                    className={'transaction-line'}
                                    bgColor={index % 2 === 0 ? '#6a687a' : '#84828f'}
                                    key={transaction.transaction_id}
                                >
                                    <StyledTransactionType>{getText(transaction.type)}</StyledTransactionType>
                                    <StyledTransactionAmount
                                        color={amountColor(
                                            transaction.type,
                                            transaction.sender_user_id,
                                            transaction.paid,
                                        )}
                                    >
                                        <Tooltip
                                            title={`To: ${
                                                transaction.type === TransactionTypes.TRANSFER
                                                    ? transaction.receiver_first_name
                                                    : `me From: ${transaction.sender_user_id}`
                                            }`}
                                        >
                                            ${transaction.amount}
                                        </Tooltip>
                                    </StyledTransactionAmount>

                                    {transaction.type !== TransactionTypes.DEPOSIT ? (
                                        <Tooltip
                                            title={`${transaction.paid ? 'Mark As Unpaid ❌' : 'Mark As Paid ✅'}`}
                                        >
                                            <span id="paid-status">{transaction.paid ? '✅' : '🧳'}</span>
                                        </Tooltip>
                                    ) : (
                                        '💰'
                                    )}
                                    <Tooltip title={`${transaction.due_date}`}>
                                        <span id="due-date">{transaction?.due_date ? `🗓` : ''} </span>
                                    </Tooltip>
                                </StyledTransactionLine>
                            </>
                        );
                    })}
            </span>
        </StyledTransactionHistory>
    );
};

export default TransactionHistory;
