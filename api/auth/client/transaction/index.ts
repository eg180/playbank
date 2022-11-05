import express from "express";
import { appDataSource } from "../../../../api/dbconfig";
import { Transaction } from "../../../src/entities/Transaction";

const router = express.Router();

router.get("/:clientId", async (req, res) => {
  const { clientId } = req.query;
  try {
    const results = await appDataSource
      .getRepository(Transaction)
      .createQueryBuilder('transaction')
      .where({ client: clientId })
      .getMany();
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "something went wrong" });
  }
});

router.post("/create/:clientId", async (req, res) => {
  // const {type, amount, client} = req.body;
  const { clientId } = req.params;

  const transaction = Transaction.create({
    ...req.body,
    client_id: clientId,
  });
  await transaction.save();

  return res.status(201).json(transaction);
});

module.exports = router;
