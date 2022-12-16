import express from 'express';
import {Banker} from '../../src/entities/Banker';



const router = express.Router();


router.post('/create', async (req, res) => {
    const { firstName, lastName, email, employeeNumber } = req.body;

    const banker = Banker.create({
        first_name: firstName,
        last_name: lastName,
        email,
        employee_number: employeeNumber,
    })
    await banker.save();
    return res.status(200).json(banker);

})

module.exports = router;





