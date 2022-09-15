require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());


var PORT = `${process.env.PORT}` || 3000;
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
  console.log(`Database: ${process.env.DB_NAME}`);
})