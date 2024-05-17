import express from "express";
import userRouter from "./routes/User.js";
import { connectToDatabase } from "./database/DbConnection.js"
const app = express();

//database connection
connectToDatabase();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});