import { Client } from "../../../src/entities/Client";
import {LoginInterface} from "../types";
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../../api/config/secrets");

module.exports = async (req: {body: LoginInterface, jwt: any}, res: any, next: any) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOneBy({
      email
    });
  const clientExists = password === client?.password ?? false;
  console.log(clientExists)
  if (clientExists) {
    const token = makeJwt(client);
    req.jwt = token;
    return res.status(201).json({success: "ok", token: req.jwt})
  } else {
    // sad path - user exists but password was incorrect
   return res.status(401).json({message: 'Invalid Credentials'})
  }

  // if (clientExists && bcrypt.compareSync(client?.password, password)) {
  //   const token = makeJwt(client);
  //   req.jwt = token;
  //   return res.status(201).json({success: "ok", token: req.jwt})

  //   // return next()
  // } else {
  //   // sad path - user exists but password was incorrect
  // return res.status(401).json({message: 'Invalid Credentials'})
  // }
  

  } catch (error) {
    res.status(500).json({error: "An error occured."})
  }
};

function makeJwt(user: any) {
	const payload = {
		sub: user.user_id,
		email: user.email,
	};

	const options = {
		expiresIn: "48h",
	};

	return jwt.sign(payload, jwtSecret, options);

};


