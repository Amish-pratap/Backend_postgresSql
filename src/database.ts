import { DataSource } from "typeorm";
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: `${dbHost}`,
  port: 5432,
  username: `${dbUser}`,
  password: `${dbPassword}`,
  database: `${dbName}`,
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});
