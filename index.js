import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`App running at http://localhost:${process.env.PORT}!`)
);
