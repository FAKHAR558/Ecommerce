const app = require("./app");
const dotenv = require("dotenv");
const DB_CONNECTION = require("./config/database");
//Config
// middleware
dotenv.config({});
//Config
DB_CONNECTION();
app.listen(process.env.PORT, () => {
  console.log(`Server is Running On ${process.env.PORT} `);
});
