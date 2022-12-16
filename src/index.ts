
import express from 'express';
import {appDataSource} from '../dbconfig'
const clientRouter = require("../auth/client");
const bankerRouter = require("../auth/banker");
const transactionRouter = require("../auth/client/transaction")

const app = express();

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



// middleware
app.use(express.json());

// routes
app.use("/auth/client", clientRouter);
app.use("/auth/banker", bankerRouter);
app.use("/auth/client/transaction", transactionRouter);


