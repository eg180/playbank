import express from 'express';
// const cors = require('cors')

// middlewares
const loginVerification = require("./middlewares")

const router = express.Router();
// router.use(cors());


router.post('/', loginVerification, (req, res, next) => {
});




module.exports = router;