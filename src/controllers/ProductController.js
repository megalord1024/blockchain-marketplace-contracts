const ProductService  = require("../services/ProductService.js");

const ProductController = {
  listItem: async (req, res) => {
    try {
      const { uuid, productImage, name, user } = req.body;

      const result = await ProductService.listProduct(uuid, sellerUuid = user.uuid, productImage, name);

      if (result.success) {
        res.status(201).json({ message: "list item successfully" });
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while list item." + error });
    }
  }
};

module.exports = ProductController;
