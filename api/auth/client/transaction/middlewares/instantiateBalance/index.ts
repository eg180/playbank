import { appDataSource } from "../../../../../../api/dbconfig"
import { Balance } from "../../../../../src/entities/Balance";

module.exports = async (req: any, res: any, next: () => void) => {
  const { client_id } = req.body;



// set new account balance to zero
  try {
    appDataSource
    .createQueryBuilder()
    .insert()
    .into(Balance)
    .values([
      {client: client_id, balance: 0}
    ])
    .execute();
    next();
  } catch (error) {
    console.log('Unable to initialize balance.')
    return res.status(401).json({message: 'Unable to initialize balance.'})
  }
};
