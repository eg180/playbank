import express from "express";
import { appDataSource } from "../../../../api/dbconfig";
import { Transaction } from "../../../src/entities/Transaction";
import { getObjectForTransaction } from "./factories/transaction";

const router = express.Router();

router.get("/:clientId", async (req, res) => {
  const { clientId } = req.query;
  try {
    const results = await appDataSource
      .getRepository(Transaction)
      .createQueryBuilder("transaction")
      .where({ client: clientId })
      .getMany();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(401).json({ error: "something went wrong" });
  }
});

router.post("/create/:clientId", async (req, res) => {
  const { clientId } = req.query;

  // We use a single endpoint for deposits, tranfers and withdrawals. The data to be saved to the db depends on the type.
  const obj: any = getObjectForTransaction(req.body, clientId as any);

  const transaction = Transaction.create({
    ...obj,
  });
  await transaction.save();

  return res.status(201).json(transaction);
});

module.exports = router;
