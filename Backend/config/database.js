const mongoose = require("mongoose");

const DB_CONNECTION = async () =>
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(
      `Db Is connected at :  ${data.connections[0]._connectionString}`
    );
  });

module.exports = DB_CONNECTION;
