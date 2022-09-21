require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use('/qa', require('./routes.js'));


app.get("/loaderio-b3844ac0cc5713353cd58d7735d0ee9d", (req, res) => res.send("loaderio-b3844ac0cc5713353cd58d7735d0ee9d"))

const PORT = `${process.env.PORT}` || 3000;

app.listen(PORT, () => {
  console.log(`Listening at localbro:${PORT}`);
  // console.log(`Database: ${process.env.DB_NAME}`);
})