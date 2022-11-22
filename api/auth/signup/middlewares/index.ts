import { SignUpInterface } from "../types";
import { appDataSource } from "../../../dbconfig";
import { Balance } from "../../../src/entities/Balance";
import { Client } from "../../../src/entities/Client";
var bcrypt = require("bcryptjs");

module.exports = async (req: {clientId: number, body: SignUpInterface }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => void) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    await bcrypt.genSalt(10, function (err: any, salt: any) {
      if (err) {
        return res.status(500).json({error: "An error occured saving your credentials."})

      }
      
      bcrypt.hash(password, salt, function (err: any, hash: any) {
        const client = Client.create({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hash,
        });
        client.save().then(client => {
          try {
            appDataSource
            .createQueryBuilder()
            .insert()
            .into(Balance)
            .values([
              {client: () => client.id.toString(), balance: 0}
            ])
            .execute();
            next();
          } catch (error) {
            console.log('Unable to initialize balance.')
            return res.status(401).json({error: 'Unable to initialize balance.'})
          }
        }).catch(err => {
          console.log(err)
          return res.status(401).json({error: 'Unable to initialize balance.'})
        });
      });
    });
  } catch (error) {
    return res.status(500).json({error: "An error occured saving your credentials."})
  }
};