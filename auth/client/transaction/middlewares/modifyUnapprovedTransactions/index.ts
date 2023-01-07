
import { appDataSource } from "../../../../../dbconfig";

module.exports = async (req: {body: {data: [string[], boolean]}}, res: any, next: any) => {
  const approve: boolean = req.body.data[1];
  let iouIds = `('${req.body.data[0].join("','")}')`;
  try {
    const unApprovedTransactions = await appDataSource.query(
      `UPDATE transactions
      SET accepted_by_receiver = ${approve}
      WHERE id IN ${iouIds}`
    );
   
 
    return res.status(200).json(unApprovedTransactions);
  } catch (err) {
    return res.status(401).json({error: 'Something went wrong.'})
  }
};
