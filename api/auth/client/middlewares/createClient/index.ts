import { Client } from '../../../../src/entities/Client';

module.exports = async (req: { body: { firstName: string; lastName: string; email: string; client_id?: any; password: string}; }, res: any, next: any) => {
    const { firstName, lastName, email, password } = req.body;

    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password
    })

    await client.save();
    req.body.client_id = client.id;
    
    next();
}