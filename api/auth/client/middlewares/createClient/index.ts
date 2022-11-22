import { Client } from '../../../../src/entities/Client';

module.exports = async (req: { body: { firstName: string; lastName: string; email: string; client_id?: any; password: string}; }, res: any, next: any) => {
    const { firstName, lastName, email, password } = req.body;
    console.log('creating client?')
    const client = Client.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password
    })

    const clientFromDb = await client.save();
    // get client so that we have their client ID?
    console.log('do we get a user Id?', clientFromDb);
    
    next();
}