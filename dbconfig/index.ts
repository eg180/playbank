import { DataSource } from "typeorm";
import { Banker } from "../src/entities/Banker";
import { Client } from "../src/entities/Client";
import { Balance } from "../src/entities/Balance";
import { Transaction } from "../src/entities/Transaction";
import { Memo } from "../src/entities/Memo";


// db connection
export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
    url: process.env.DATABASE_URL ?? undefined,
    username: process.env.DB_USERNAME ?? undefined,
    password: process.env.DB_PASSWORD ?? undefined,
    database: "postgres",
    entities: [Banker, Client, Transaction, Balance, Memo],
    synchronize: true,
  });

  