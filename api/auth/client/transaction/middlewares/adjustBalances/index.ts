// import { appDataSource } from "../../../../../../api/dbconfig"
import { Transaction } from "../../../../../src/entities/Transaction";
import { getObjectForTransaction } from "../../factories/transaction";

module.exports = async (req: any, res: any, next: () => void) => {
  const { clientId } = req.query;


  // We use a single endpoint for deposits, tranfers and withdrawls. The data to be saved to the db depends on the type.
  const obj: any = getObjectForTransaction(req.body, clientId as any);

  const transaction: Transaction = Transaction.create({
    ...obj,
    client: clientId
  });


  // update balances
  // try {
  //   await appDataSource
  //   .getRepository(Transaction)
  //   .createQueryBuilder("transaction")
  //   .where(client)
  // } catch (error) {
    
  // }

  // save to db
  try {
    await transaction.save();
    res.status(201).json(transaction);
    next();
  } catch (error) {
    return res.status(401).json({error: 'Oops, I broke it again!'})
  }
};
