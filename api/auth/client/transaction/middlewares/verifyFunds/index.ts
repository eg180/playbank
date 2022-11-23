import { Balance } from "../../../../../src/entities/Balance";
import {TransactionTypes} from "../../../../../types/common"

module.exports = async (req: any, res: any, next: any) => {
  const clientId = req.jwtSub;
  const { type, amount } = req.body;
  try {
    const sender = await Balance.findOneBy({
      client: clientId
    }) ?? {balance: 0};
  if ((type === TransactionTypes.WITHDRAW || type === TransactionTypes.TRANSFER) && (sender.balance < amount)) {
    return res.status(403).json({message: "insufficient funds."})
  }
  } catch (error) {
    return console.log('there was an error', error)
  }
  next();
};

// this middleware ensures that the sender has enough to cover a withdraw or transfer
