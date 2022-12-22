export enum TransactionTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer',
    REMINDER = 'reminder'
}

interface BaseTransactionInterface {
    amount: number;
    client_id: number;
}

export interface DepositInterface extends BaseTransactionInterface {
    type: TransactionTypes.DEPOSIT;
}

export interface WithdrawInterface extends BaseTransactionInterface {
    type: TransactionTypes.WITHDRAW;
}

export interface TransferInterface extends BaseTransactionInterface {
    type: TransactionTypes.TRANSFER;
    transferred_to: number;
    received_from: number;
}

export interface ReminderInterface extends BaseTransactionInterface {
    type: TransactionTypes.REMINDER;
    memo: string;
}

export interface TransactionInterface {
    amount: string;
    created_at: Date;
    id: number,
    reminder_date: Date;
    type: TransactionTypes;
    updated_at: Date;
}