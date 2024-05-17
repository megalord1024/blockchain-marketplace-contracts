import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/blockchain-marketplace", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

const userSchema = new Schema({
  uuid: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const productSchema = new Schema({
  uuid: { type: String, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productImage: { type: Buffer, required: false },
  name: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

async function createUsersCollection() {
  try {
    await User.createCollection();
    console.log("Users collection created successfully.");
  } catch (error) {
    console.error("Error creating users collection:", error);
  }
}

async function createProductsCollection() {
  try {
    await Product.createCollection();
    console.log("Products collection created successfully.");
  } catch (error) {
    console.error("Error creating products collection:", error);
  }
}

async function createCollections() {
  await createUsersCollection();
  await createProductsCollection();
  await mongoose.disconnect();
}

await createCollections();
