import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from express");
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "amish",
  password: "1361",
  database: "users_db",
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB connected successfully:");
  })
  .catch((err) => {
    console.log("error connecting db", err);
  });

app.listen(port, () => {
  console.log(`listing to port ---${port}`);
});
