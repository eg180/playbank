import express from 'express';
import {Client} from '../../src/entities/Client'

const router = express.Router();

router.get('/getall', async (req, res) => {
    const results = await Client.find();
    return res.status(200).json(results);
})


router.post('/create', async (req, res) => {
    const { firstName, lastName, email, balance } = req.body;

    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
        balance
    })

    await client.save()
    return res.json(client);
})




module.exports = router;