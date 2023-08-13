import "reflect-metadata";
import express from "express";

import userRoute from "./routes/auth";
import productRoute from "./routes/product";
import { AppDataSource } from "./database";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.use("/api", userRoute);
app.use("/api", productRoute);

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
