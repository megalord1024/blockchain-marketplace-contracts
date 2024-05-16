const express = require('express');
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');

app.use('/users', userRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});