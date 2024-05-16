const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// GET /users - Get all users
//router.get('/', UserController.getAllUsers);

// POST /users - Create a new user
router.post('/create', UserController.createUser);

// GET /users/:id - Get a specific user by ID
//router.get('/:id', UserController.getUserById);

// PUT /users/:id - Update a specific user by ID
//router.put('/:id', UserController.updateUserById);

// DELETE /users/:id - Delete a specific user by ID
//router.delete('/:id', UserController.deleteUserById);

module.exports = router;