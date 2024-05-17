const mongoose = require("mongoose");

const productSchema = new Schema({
  uuid: { type: String, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productImage: { type: Buffer, required: false },
  name: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
