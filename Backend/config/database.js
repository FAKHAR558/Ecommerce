const mongoose = require("mongoose");

const DB_CONNECTION = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`Db is Connected on ${data.length}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = DB_CONNECTION;
