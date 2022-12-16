import express from "express";
import { appDataSource } from "../../../../api/dbconfig";
import { Transaction } from "../../../src/entities/Transaction";

// middleware
const adjustBalances = require("./middlewares/adjustBalances")
const verifyFunds = require("./middlewares/verifyFunds");
const verifyAuthorization = require("../../../auth/middlewares/authorization")
const getBalance = require('../middlewares/getBalance');
const getTransactions = require('./middlewares/getTransactions');

const router = express.Router();

router.get("/", verifyAuthorization, getTransactions, async (req, res) => {
});

router.post("/create", verifyAuthorization, verifyFunds, adjustBalances, getBalance, async (req, res) => {
});

module.exports = router;
