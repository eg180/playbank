import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledTransactionHistory, StyledTransactionLine } from '../styles/TransactionHistory.style';

enum TransactionTypeTextEnum {
    transfer = 'IOU',
    deposit = 'Deposit',
    withdraw = 'Withdraw',
}

export enum TransactionTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'IOU',
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
    updated_at: Date;
}

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [hideTransactions, setHideTransactions] = useState<boolean>(true);

    function getIcon(transactionType: string): string {
        if (transactionType === TransactionTypeTextEnum.transfer) {
            return '💸';
        } else if (transactionType === TransactionTypeTextEnum.deposit) {
            return '🏦';
        }
        return '📝';
    }

    function getText(transactionType: string): string {
        if (transactionType === 'transfer') {
            return 'IOU';
        }
        return transactionType.toUpperCase();
    }

    function getTransactionInfo(transactionObject: Transaction): string {
        if (transactionObject.type !== 'deposit') {
            return `to ${transactionObject.receiver_first_name} Status: ${transactionObject.paid ? 'Paid ✅' : 'Unpaid ⏰'} ${transactionObject?.due_date ? `Due: ${transactionObject.due_date}` : ''}`
        }
        return ''
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
                {hideTransactions ? 'IOUs 📁' : 'IOUs 📂'}
            </span>
            <span id="transactions">
                {hideTransactions === false &&
                    transactions.map((transaction: Transaction, index) => {
                        return (
                            <StyledTransactionLine
                                className={'transaction-line'}
                                bgColor={index % 2 === 0 ? '#809bce' : '#95b8d1'}
                                key={transaction.transaction_id}
                            >
                                {getIcon(transaction.type)}{' '}
                                <span className={'transaction-type'}>{getText(transaction.type)}</span> of $
                                {transaction.amount} {getTransactionInfo(transaction)}
                            </StyledTransactionLine>
                        );
                    })}
            </span>
        </StyledTransactionHistory>
    );
};

export default TransactionHistory;
