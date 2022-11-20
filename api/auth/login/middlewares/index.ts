import { Client } from "../../../src/entities/Client";
import { LoginInterface } from "../types";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../../api/config/secrets");

module.exports = async (
  req: { body: LoginInterface; jwt: any },
  res: any,
  next: any
) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOneBy({
      email,
    });
    // const foundClient: boolean  = email === client?.email ?? false;
    // console.log(client, foundClient);
    try {
      if (client !== null) {
        bcrypt.compare(password, client.password, function(err: any, __: any) {
          console.log('line 23')
          if (err) return res.status(401).json({ message: "Invalid Credentials" });

          const token = makeJwt(client);
          req.jwt = token;
          return res.status(200).json({ success: "ok", email: client.email, token: req.jwt });
      });
      
    } else {
      // sad path - user exists but password was incorrect
      console.log('line 33')
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    } catch (error) {
      res.status(500).json({ error: "An error occured." });
    }
    
  } catch (error) {
    res.status(500).json({ error: "An error occured." });
  }
};

function makeJwt(user: any) {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "48h",
  };

  return jwt.sign(payload, jwtSecret, options);
}
