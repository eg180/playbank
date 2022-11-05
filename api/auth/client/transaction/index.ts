import express from 'express';
import { Transaction } from '../../../src/entities/Transaction'

const router = express.Router();


router.post('/create', async (req, res) => {
    // const {type, amount, client} = req.body;

    const transaction = Transaction.create({
        ...req.body
    })
   await transaction.save();

   return res.status(201).json(transaction);

});

module.exports = router;
