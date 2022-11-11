import { SignUpInterface } from "../types";
import { Client } from "../../../src/entities/Client";
var bcrypt = require("bcryptjs");

module.exports = async (req: { body: SignUpInterface }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => void) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    bcrypt.genSalt(10, function (err: any, salt: any) {
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
        client.save();
        req.body.client_id = client.id;
      });
    });
    next();
  } catch (error) {
    return res.status(500).json({error: "An error occured saving your credentials."})
  }
};
