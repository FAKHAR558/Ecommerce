const express = require("express");
const app = express();
app.use(express.json());
const errorMiddleware = require("./Middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
//Routes
app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware For Errors
app.use(errorMiddleware);

module.exports = app;
