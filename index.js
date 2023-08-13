const express = require("express");
const app = express();
const connectDB = require("./db")
const crud = require("./routes/api/crud")
const bodyParser = require("body-parser")
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
connectDB();
app.use("/api", crud)

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT)
});