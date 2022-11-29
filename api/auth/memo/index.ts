import express from 'express';

// middleware
const checkAuthorization = require('../../auth/middlewares/authorization');
const getAllMemos = require('../memo/middlewares/getAllMemos')
const deleteMemos = require('../memo/middlewares/deleteMemos')


const router = express.Router();

router.get('/',checkAuthorization, getAllMemos, async (req, res) => {
});

router.delete('/', checkAuthorization, deleteMemos, async (req, res) => {
})




module.exports = router;