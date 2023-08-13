import "reflect-metadata";
import express from "express";
const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
import routes from "./routes/auth";
import { AppDataSource } from "./database";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.use("/api", routes);

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
