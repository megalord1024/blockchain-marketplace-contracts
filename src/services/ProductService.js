const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/Product.js");
const User = require("../models/User.js")

const ProductService = {
  listProduct: async (uuid, sellerUuid, productImage, name) => {
    try {
      console.log(sellerUuid);
      const user = await User.findOne({ uuid: sellerUuid });
      // Create a new product
      const product = new Product({ uuid, sellerId: user._id, productImage, name });
      await product.save();

      return { success: true };
    } catch (error) {
      const message = `An error occurred: ${error.message}`;
      return {
        success: false,
        message: message,
      };
    }
  },
};

module.exports = ProductService;
