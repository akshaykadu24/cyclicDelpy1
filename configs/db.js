const mongoose  = require("mongoose");
require("dotenv").config()

const database = mongoose.connect(process.env.URL)

module.exports = {database}