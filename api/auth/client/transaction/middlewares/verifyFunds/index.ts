import { Balance } from "../../../../../src/entities/Balance";
import {TransactionTypes} from "../../../../../types/common"

module.exports = async (req: any, res: any, next: any) => {
  const clientId = req.jwtSub;
  const { type, amount } = req.body;
  try {
    const sender = await Balance.findOneBy({
      id: clientId
    }) ?? {balance: 0};
  console.log('moving on to next with this sender', sender);
  console.log('transactin type', type);
  if (type !== TransactionTypes.DEPOSIT && (sender.balance < amount)) {
    return res.status(403).json({message: "insufficient funds."})
  }
  } catch (error) {
    return console.log('there was an error', error)
  }
  console.log('going to next')
  next();
};

// this middleware ensures that the sender has enough to cover a transfer
