const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.URI)
    .then(() => console.log("Database Connected Successfully"));
};

module.exports = connectDb;
