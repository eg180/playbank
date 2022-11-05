import { DataSource } from "typeorm";
import { Banker } from "../src/entities/Banker";
import { Client } from "../src/entities/Client";
import { Transaction } from "../src/entities/Transaction";

// db connection
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    entities: [Banker, Client, Transaction],
    synchronize: true,
  });

  