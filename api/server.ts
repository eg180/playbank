
import express from 'express';
import {appDataSource} from './dbconfig';

const cors = require('cors')
const signInRouter = require("./auth/login");
const signUpRouter = require("./auth/signup");
const clientRouter = require("./auth/client");
const bankerRouter = require("./auth/banker");
const transactionRouter = require("./auth/client/transaction");


const app = express();

app.use(cors());

var allowedOrigins = ['http://localhost:3000', 'http://192.168.1.88:3000'];
app.use(cors({
  origin: function(origin: string, callback: (arg0: Error | null, arg1: boolean) => any){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// middleware
app.use(express.json());
// routes
app.use("/api/auth/login", signInRouter);
app.use("/api/auth/signup", signUpRouter);
app.use("/api/auth/client", clientRouter);
app.use("/api/auth/banker", bankerRouter);
app.use("/api/auth/client/transaction", transactionRouter);

appDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!");
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
})
.catch((err) => {
  console.error("Error during Data Source initialization", err);
});


module.exports = app;