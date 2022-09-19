require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use('/qa', require('./routes.js'));


const PORT = `${process.env.PORT}` || 3000;

app.listen(PORT, () => {
  console.log(`Listening at localbro:${PORT}`);
  // console.log(`Database: ${process.env.DB_NAME}`);
})