
import { appDataSource } from "../../../../../dbconfig";
// import { Transaction } from "../../../../../src/entities/Transaction";


module.exports = async (req: any, res: any, next: any) => {
  const clientId = req.jwtSub;
  try {
    // const transactions = await appDataSource
    //   .getRepository(Transaction)
    //   .createQueryBuilder("transaction")
    //   .where(`sender_user_id = ${clientId}`, { sender_user_id: clientId })
    //   .getMany();

    const allTransactions = await appDataSource.query(
      `SELECT type, amount, first_name AS receiver_first_name, sender_user_id, client_id, receiver_user_id, paid, reminder_date, additional_info, due_date, reminder_date, transactions.updated_at, transactions.id AS transaction_id, transactions.created_at
      FROM transactions
      FULL OUTER JOIN clients
      ON clients.id = transactions.receiver_user_id
      WHERE sender_user_id = ${clientId} OR client_id = ${clientId}`
    );
   
 
    return res.status(200).json(allTransactions);
  } catch (err) {
    return res.status(401).json({error: 'Something went wrong.'})
  }
};
