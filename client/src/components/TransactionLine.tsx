import React from 'react';
import axios from 'axios';
import { Tooltip } from 'antd';
import {
    StyledTransactionAmount,
    StyledTransactionLine,
    StyledTransactionType,
} from '../styles/TransactionHistory.style';
import { TransactionTypes } from 'src/components/TransactionHistory';
import BASEURL from 'src/utilities/BASEURL';
import useGetJwtData from 'src/utilities/hooks/useGetJwtData';

const TransactionLine = (props: any) => {
    const { transaction, index, setTransactions } = props;
    const token = useGetJwtData();
    const moiUnparsed: any = sessionStorage.getItem('moi');
    const moi: { name: string; sub: number } = JSON.parse(moiUnparsed);

    const amountColor = (transactionType: string, sender_id: number, paid: boolean) =>
        transactionType === TransactionTypes.DEPOSIT
            ? '#00afb9'
            : transactionType === TransactionTypes.TRANSFER && !paid
            ? sender_id === moi.sub
                ? '#fb6f92'
                : '#'
            : 'black';
    function getText(transactionType: string): string {
        if (transactionType === 'transfer') {
            return 'IOU';
        }
        return transactionType.toUpperCase();
    }
    async function togglePaid(e: React.SyntheticEvent): Promise<void> {
        e.preventDefault();
        if (token !== 'notfound') {
            try {
                const header = { Authorization: `${token}` };
                const res = await axios.put(`${BASEURL}/auth/client/transaction`, {
                    headers: header,
                    data: [transaction.transaction_id, transaction.paid, moi.sub],
                });
                setTransactions(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <StyledTransactionLine
                className={'transaction-line'}
                bgColor={index % 2 === 0 ? '#6a687a' : '#84828f'}
                key={transaction.transaction_id}
            >
                <StyledTransactionType>{getText(transaction.type)}</StyledTransactionType>
                <StyledTransactionAmount
                    color={amountColor(transaction.type, transaction.sender_user_id, transaction.paid)}
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
                    <Tooltip title={`${transaction.paid ? 'Mark As Unpaid ❌' : 'Mark As Paid ✅'}`}>
                        <span id="paid-status" onClick={togglePaid}>
                            {transaction.paid ? '✅' : '🧳'}
                        </span>
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
};

export default TransactionLine;
