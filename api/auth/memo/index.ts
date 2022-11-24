import express from 'express';

// middleware
const checkAuthorization = require('../../auth/middlewares/authorization');
const getAllMemos = require('../memo/middlewares/getAllMemos')


const router = express.Router();

router.get('/',checkAuthorization, getAllMemos, async (req, res) => {
});




module.exports = router;