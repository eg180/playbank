import express from "express";

// middleware
const adjustBalances = require("./middlewares/adjustBalances")
const verifyFunds = require("./middlewares/verifyFunds");
const verifyAuthorization = require("../../../auth/middlewares/authorization")
const getBalance = require('../middlewares/getBalance');
const getTransactions = require('./middlewares/getTransactions');
const getUnapprovedTransactions = require('./middlewares/getUnapprovedTransactions');
const modifyUnapprovedTransactions = require('./middlewares/modifyUnapprovedTransactions');
const updatePaidStatus = require('./middlewares/updatePaidStatus');
const router = express.Router();

router.put(`/`, updatePaidStatus, getTransactions, async (req, res) => {
});

router.put('/unapproved', modifyUnapprovedTransactions, (req, res) => {
    res.end();
});

router.get("/unapproved", verifyAuthorization, getUnapprovedTransactions, async (req, res) => {
});


router.get("/", verifyAuthorization, getTransactions, async (req, res) => {
});

router.post("/create", verifyAuthorization, verifyFunds, adjustBalances, getBalance, async (req, res) => {
});


module.exports = router;
