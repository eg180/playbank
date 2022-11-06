import express from "express";
import { appDataSource } from "../../../../api/dbconfig";
import { Transaction } from "../../../src/entities/Transaction";

// middleware
const adjustBalances = require("./middlewares/adjustBalances")
const verifyFunds = require("./middlewares/verifyFunds");

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

router.post("/create/:clientId", verifyFunds, adjustBalances, async (req, res) => {
  res.status(201).json({message: "ok"});
});

module.exports = router;
