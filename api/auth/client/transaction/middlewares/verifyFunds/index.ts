import { Balance } from "../../../../../src/entities/Balance";
import {TransactionTypes} from "../../../../../types/common"

module.exports = async (req: any, res: any, next: any) => {
  const { clientId } = req.query;
  const { type, amount } = req.body;
  console.log(req.headers);
  console.log(clientId, 'is what we are searching by')
  try {
    const sender = await Balance.findOneBy({
      id: clientId
    });
    console.log("this is the senders balance", sender?.balance, "and the amount being sent", amount);

  if (type === TransactionTypes.TRANSFER && (!sender?.balance || sender?.balance < amount)) {
    return res.status(403).json({message: "insufficient funds."})
  }
  } catch (error) {
    return console.log('there was an error', error)
  }
  
  
  next();
};

// this middleware ensures that the sender has enough to cover a transfer
