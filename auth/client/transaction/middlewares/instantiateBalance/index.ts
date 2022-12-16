import { appDataSource } from "../../../../../dbconfig"
import { Balance } from "../../../../../src/entities/Balance";

module.exports = async (req: any, res: any, next: any) => {
// set new account balance to zero
  try {
    appDataSource
    .createQueryBuilder()
    .insert()
    .into(Balance)
    .values([
      {client: req.clientId, balance: 0}
    ])
    .execute();
    next();
  } catch (error) {
    return res.status(401).json({message: 'Unable to initialize balance.'})
  }
};
