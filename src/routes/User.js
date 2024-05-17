const express = require("express");
const UserController = require("../controllers/UserController.js");
const userRouter = express.Router();

// GET /users - Get all users
//router.get('/', UserController.getAllUsers);

// POST /users - Create a new user
userRouter.post("/registration", UserController.createUser);

// POST /users - Create a new user
userRouter.post("/login", UserController.loginUser);

// GET /users/:id - Get a specific user by ID
//router.get('/:id', UserController.getUserById);

// PUT /users/:id - Update a specific user by ID
//router.put('/:id', UserController.updateUserById);

// DELETE /users/:id - Delete a specific user by ID
//router.delete('/:id', UserController.deleteUserById);

module.exports =  userRouter;
