import { Client } from "../../../src/entities/Client";
import {LoginInterface} from "../types"

module.exports = async (req: {body: LoginInterface}, res: any, next: any) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOneBy({
      email
    });
  const clientExists = password === client?.password ?? false;
  console.log(clientExists)
  if (clientExists) {
    return next()
  } else {
    // sad path - user exists but password was incorrect
  res.status(401).json({message: 'Invalid Credentials'})
  }
  

  } catch (error) {
    res.status(500).json({error: "An error occured."})
  }
};


