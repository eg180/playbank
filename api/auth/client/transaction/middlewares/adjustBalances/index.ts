import { appDataSource } from "../../../../../../api/dbconfig";
import { Balance } from "../../../../../src/entities/Balance";
import { Transaction } from "../../../../../src/entities/Transaction";
import { getObjectForTransaction } from "../../factories/transaction";
import { TransactionTypes } from "../../../../../types/common";

module.exports = async (req: any, res: any, next: any) => {
  // const { clientId } = req.query;
  const clientId = req.jwtSub;
  const { type } = req.body;
  // We use a single endpoint for deposits, tranfers and withdrawls. The data to be saved to the db depends on the type.
  const obj: any = getObjectForTransaction(req.body, clientId as any);

  const transaction: Transaction = Transaction.create({
    ...obj,
    client: clientId,
  });
  // save to db
  try {
    await transaction.save();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Error saving transaction to database." });
  }
  if (type === TransactionTypes.DEPOSIT) {
    try {
      // modify originator's balance
      await appDataSource
        .createQueryBuilder()
        .update(Balance)
        .set({ balance: () => `balance + ${transaction.amount}` })
        .where(`client = ${clientId}`, { client: clientId })
        .execute();
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
        .set({ balance: () => `balance + ${transaction.amount}` })
        .where(`client = ${obj.transferred_to}`, { client: obj.transferred_to })
        .execute();
      next();
    } catch (error) {
      res.status(401).json({ error: "Could not update receiver balance" });
    }
  }
  next();
};
