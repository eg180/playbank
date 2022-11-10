import express from 'express';
// const cors = require('cors')

// middlewares
const loginVerification = require("./middlewares")

const router = express.Router();
// router.use(cors());


router.post('/', loginVerification, (__, res) => {
    return res.status(201).json({success: "ok"})
})




module.exports = router;