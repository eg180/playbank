
import { appDataSource } from "../../../../../dbconfig";

module.exports = async (req: {body: {data: [number, boolean, number]}, jwtSub: number}, res: any, next: any) => {
    const updatedPaidStatus: boolean = !req.body.data[1];
  const iouId = `('${req.body.data[0]}')`;
  const clientId = req.body.data[2];
  req.jwtSub = clientId;
  try {
    await appDataSource.query(
      `UPDATE transactions
      SET paid = ${updatedPaidStatus}
      WHERE id = ${iouId}`
    );
    next();
  } catch (err) {
    return res.status(401).json({error: 'Something went wrong.'})
  }
};
