import { Client } from '../../../../src/entities/Client';

module.exports = async (req: { body: { firstName: string; lastName: string; email: string; client_id?: any}; }, res: { json: (arg0: Client) => any; }, next: any) => {
    const { firstName, lastName, email } = req.body;

    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
    })

    await client.save();
    req.body.client_id = client.id;
    
    next();
}