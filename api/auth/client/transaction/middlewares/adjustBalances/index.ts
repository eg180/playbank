import { appDataSource } from "../../../../../../api/dbconfig";
import { Balance } from "../../../../../src/entities/Balance";
import { Transaction } from "../../../../../src/entities/Transaction";
import { Memo } from "../../../../../src/entities/Memo";

import { getObjectForTransaction } from "../../factories/transaction";
import { TransactionTypes } from "../../../../../types/common";

module.exports = async (req: any, res: any, next: any) => {
  // const { clientId } = req.query;
  const clientId = req.jwtSub;
  const { type } = req.body;
  const obj: any = getObjectForTransaction(req.body, clientId as any);
  console.log('obj we will be saving', obj);
  // We use a single endpoint for deposits, tranfers and withdrawls. The data to be saved to the db depends on the type.
  if (type === TransactionTypes.REMINDER) {
    try {
      const memo = await Memo.create(obj)
      await memo.save();
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Error saving transaction to database." });
    }
    
    // try {
    //   await appDataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Memo)
    //   .values(obj)
    //   .execute()
    //   next();
    // } catch (error) {
    //   console.log(error);
    //   return res
    //     .status(401)
    //     .json({ error: "Error saving transaction to database." });
    // }
  } else {
    const transaction: Transaction = Transaction.create({
      ...obj,
      clientId
    });
    // save to db
    try {
      console.log('you are here trying to save this transaction', transaction);
      await transaction.save();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ error: "Error saving transaction to database." });
    }
    
    // adjust balances after saving the transaction
  
    if (type === TransactionTypes.DEPOSIT) {
      try {
        // modify originator's balance
        await appDataSource
          .createQueryBuilder()
          .update(Balance)
          .set({ balance: () => `balance + ${transaction.amount}` })
          .where(`client = ${clientId}`, { client: clientId })
          .execute();
        next();
      } catch (error) {
        return res.status(401).json({ error: "Error depositing funds." });
      }
    } else if (type === TransactionTypes.TRANSFER) {
      // update balances
      try {
        // modify originator's / sender's balance
        await appDataSource
          .createQueryBuilder()
          .update(Balance)
          .set({ balance: () => `balance - ${transaction.amount}` })
          .where(`client = ${clientId}`, { client: clientId })
          .execute();
        // modify recipient balance
      } catch (error) {
        res.status(401).json({ error: "Could not update sender balance" });
      }
      try {
  
        // modify recipient's balance
        await appDataSource
          .createQueryBuilder()
          .update(Balance)
          .set({ balance: () => `balance + ${obj.amount}` })
          .where(`client = ${transaction.transferred_to}`, { client: transaction.transferred_to })
          .execute();
        next();
      } catch (error) {
        res.status(401).json({ error: "Could not update receiver balance" });
      }
    } 
    next();
  }
  
};
