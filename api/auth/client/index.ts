import express from 'express';
import {Client} from '../../src/entities/Client'

// middleware
const createClient = require('./middlewares/createClient')
const instantiateBalance = require("./transaction/middlewares/instantiateBalance");



const router = express.Router();

router.get('/getall', async (req, res) => {
    const results = await Client.find();
    return res.status(200).json(results);
})


router.post('/create', createClient, instantiateBalance, async (req, res) => {
    return res.status(201).json({success: "ok"})
})




module.exports = router;