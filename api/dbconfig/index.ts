import { DataSource } from "typeorm";
import { Banker } from "../src/entities/Banker";
import { Client } from "../src/entities/Client";
import { Transaction } from "../src/entities/Transaction";

// db connection
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Letsgo!2022",
    database: "postgres",
    entities: [Banker, Client, Transaction],
    synchronize: true,
  });

  