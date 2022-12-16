import { appDataSource } from "../../../../../dbconfig";
import { Transaction } from "../../../../../src/entities/Transaction";

module.exports = async (req: any, res: any, next: any) => {
  const clientId = req.jwtSub;
  try {
    const transactions = await appDataSource
      .getRepository(Transaction)
      .createQueryBuilder("transaction")
      .where(`sender_user_id = ${clientId}`, { sender_user_id: clientId })
      .getMany();
    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(401).json({error: 'Something went wrong.'})
  }
};
