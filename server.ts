
import express from 'express';
import {config} from './src/config/config';
import {appDataSource} from './dbconfig';

const path = require('path');
const cors = require('cors')
const signInRouter = require("./auth/login");
const signUpRouter = require("./auth/signup");
const clientRouter = require("./auth/client");
const bankerRouter = require("./auth/banker");
const transactionRouter = require("./auth/client/transaction");
const friendRouter = require("./auth/friend");
const balanceRouter = require("./auth/client/balance");
const memoRouter = require("./auth/memo");


const app = express();

app.use(cors());

var allowedOrigins = ['http://localhost:3000', 'http://192.168.1.88:3000', 'https://asgoodasmoney.herokuapp.com', 'http://asgoodasmoney.herokuapp.com'];
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
app.use("/auth/login", signInRouter);
app.use("/auth/signup", signUpRouter);
app.use("/auth/client", clientRouter);
app.use("/auth/banker", bankerRouter);
app.use("/auth/client/transaction", transactionRouter);
app.use("/auth/friend", friendRouter);
app.use("/auth/client/balance", balanceRouter);
app.use("/auth/memo", memoRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('/', (_, res) => {

      // if you want to serve a SPA using Express you totally can!
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  //   res.json({ api: "up"})
})
  
  // server.use("/api/*", (__, res) => {
  //   res.json({ api: "up"})
  // })
}



appDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!");
  app.listen(config.server.port, () => {
    console.log("Server running on port 5000");
  });
})
.catch((err) => {
  console.error("Error during Data Source initialization", err);
});


module.exports = app;