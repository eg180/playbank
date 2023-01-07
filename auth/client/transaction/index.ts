import express from "express";

// middleware
const adjustBalances = require("./middlewares/adjustBalances")
const verifyFunds = require("./middlewares/verifyFunds");
const verifyAuthorization = require("../../../auth/middlewares/authorization")
const getBalance = require('../middlewares/getBalance');
const getTransactions = require('./middlewares/getTransactions');
const getUnapprovedTransactions = require('./middlewares/getUnapprovedTransactions');
const modifyUnapprovedTransactions = require('./middlewares/modifyUnapprovedTransactions');

const router = express.Router();

router.put('/unapproved', modifyUnapprovedTransactions, (req, res) => {
    console.log('req bod of put unapproved', req.body);
    console.log('in unapproved put');
    res.end();
});

router.get("/unapproved", verifyAuthorization, getUnapprovedTransactions, async (req, res) => {
});


router.get("/", verifyAuthorization, getTransactions, async (req, res) => {
});

router.post("/create", verifyAuthorization, verifyFunds, adjustBalances, getBalance, async (req, res) => {
});


module.exports = router;
