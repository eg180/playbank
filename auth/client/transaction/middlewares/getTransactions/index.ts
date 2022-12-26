
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
      `SELECT * FROM transactions INNER JOIN clients ON clients.id = transactions.sender_user_id WHERE transactions.sender_user_id = ${clientId}`
    );
   
 
    return res.status(200).json(allTransactions);
  } catch (err) {
    return res.status(401).json({error: 'Something went wrong.'})
  }
};
