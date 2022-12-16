import { TransactionTypes } from '../../../../../types/common'
export const getObjectForTransaction = (reqBod: {
    type: string;
    amount: number;
    transferred_to?: number | undefined;
    memo?: string | undefined;
  }, clientId?: number) => {
    const { type, amount, transferred_to, memo } = reqBod;
    const originator_id = clientId;
    const generatedObj =
      type === TransactionTypes.TRANSFER
        ? {
            type: TransactionTypes.TRANSFER,
            amount,
            client_id: originator_id,
            transferred_to: transferred_to,
            received_from: originator_id,
          }
        : type === TransactionTypes.DEPOSIT
        ? { type: TransactionTypes.DEPOSIT, amount, client_id: originator_id }
        : type === TransactionTypes.WITHDRAW
        ? { type: TransactionTypes.WITHDRAW, amount, client_id: originator_id }
        : { amount, memo, client: clientId };

    return generatedObj;
  };