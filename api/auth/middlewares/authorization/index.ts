const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/secrets");

module.exports = async (req: any, res: any, next: any) => {
  const { clientId } = req.query;
  const { authorization } = req.headers;
    const token = authorization;


    // compare the token to clientId
    jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
        if (err) {
            console.log('line 13')
            return res.status(401).json('Error decoding token.')
        }
        req.jwtSub = decodedToken.sub;
    })
  
  
  
  next();
};

// this middleware ensures that the sender has enough to cover a transfer
