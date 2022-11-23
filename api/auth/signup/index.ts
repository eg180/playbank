import express from 'express';
// const cors = require('cors')

// middlewares
const hashPassword = require("./middlewares");
const instanstiateBalance = require("../../auth/client/transaction/middlewares/instantiateBalance");

const router = express.Router();
// router.use(cors());


router.post('/', hashPassword, (_req, res, next) => {
    return res.status(201).json({success: "ok"})
});




module.exports = router;