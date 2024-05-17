const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/Product.js");

const ProductService = {
  listProduct: async (uuid, sellerUuid, productImage, name) => {
    try {
      const user = await user.findOne({ uuid: sellerUuid });
      // Create a new product
      const product = new Product({ uuid, userId: user._id, productImage, name });
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

export default ProductService;
