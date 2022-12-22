import { Balance } from "../../../../../src/entities/Balance";
import {TransactionTypes} from "../../../../../types/transaction"

module.exports = async (req: any, res: any, next: any) => {
  const { type, amount } = req.body;
  try {
    const sender  = await Balance.findOne({
      where: {
        id: req.jwtSub
      }
    });

  if (!sender) {
    return res.status(403).json({message: "You must be logged in to make a transaction."})
  }
  if ((type === TransactionTypes.WITHDRAW || type === TransactionTypes.TRANSFER) && (sender.balance < amount)) {
    return res.status(403).json({message: "insufficient funds."})
  }
  } catch (error) {
    return res.status(500).json({message: "Oops. Something went wrong."})
  }
  console.log('do we at least hit that next?')
  next();
};

// this middleware ensures that the sender has enough to cover a withdraw or transfer
