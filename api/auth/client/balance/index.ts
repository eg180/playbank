import express from 'express';


// middleware
const checkAuthorization = require('../../middlewares/authorization')
const getBalance = require('../middlewares/getBalance');


const router = express.Router();

router.get('/', checkAuthorization, getBalance, async (req, res) => {
});




module.exports = router;