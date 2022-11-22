import { appDataSource } from "../../../../../../api/dbconfig"
import { Balance } from "../../../../../src/entities/Balance";

module.exports = async (req: any, res: any, next: any) => {
console.log('do you freakin see req.clientId??', req.clientId);
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
    console.log('Unable to initialize balance.')
    return res.status(401).json({message: 'Unable to initialize balance.'})
  }
};
