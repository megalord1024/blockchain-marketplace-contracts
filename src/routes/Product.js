const express = require('express');
const ProductController = require('../controllers/ProductController.js');
const { authenticateToken } = require('../auth/jwt.js'); // Corrected import

const productRouter = express.Router();

// POST /products/listItem - list item
productRouter.post('/listItem', authenticateToken, ProductController.listItem);

module.exports = productRouter;