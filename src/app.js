const express = require("express");
const userRouter = require("./routes/User.js");
const productRouter = require("./routes/Product.js");
const connectToDatabase = require("./database/DbConnection.js");
const app = express();

//database connection
connectToDatabase();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/products", productRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
