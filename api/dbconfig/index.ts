import { DataSource } from "typeorm";
import { Banker } from "../src/entities/Banker";
import { Client } from "../src/entities/Client";
import { Balance } from "../src/entities/Balance";
import { Transaction } from "../src/entities/Transaction";


// db connection
export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    entities: [Banker, Client, Transaction, Balance],
    synchronize: true,
  });

  