export enum TransactionTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    TRANSFER = 'transfer'
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