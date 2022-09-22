require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use('/qa', require('./routes.js'));


app.get("/loaderio-c6f890e29f4e4f82272ed23e937a3b31", (req, res) => res.send("loaderio-c6f890e29f4e4f82272ed23e937a3b31"))

const PORT = `${process.env.PORT}` || 3000;

app.listen(PORT, () => {
  console.log(`Listening at localbro:${PORT}`);
  // console.log(`Database: ${process.env.DB_NAME}`);
})