require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use('/qa', require('./routes.js'));


const PORT = `${process.env.PORT}` || 3000;

app.get("/loaderio-3c86398cce07b38a22addc325babf818", (req, res) => res.send("loaderio-3c86398cce07b38a22addc325babf818"))

app.listen(PORT, () => {
  console.log(`Listening at localbro:${PORT}`);
  // console.log(`Database: ${process.env.DB_NAME}`);
})