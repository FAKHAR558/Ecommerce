const app = require("./app");
const dotenv = require("dotenv");
const DB_CONNECTION = require("./config/database");

//Handeling UnCaught Errors

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting Down Server due to UnCaught error");
  process.exit(1);
});

//Config

dotenv.config();
//Config
DB_CONNECTION();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Running On ${process.env.PORT} `);
});
//Unhandled Promise Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting Down Server due to unhandled promise reection error");
  server.close(() => {
    process.exit(1);
  });
});
