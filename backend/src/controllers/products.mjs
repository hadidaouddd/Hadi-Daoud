import { Product } from "../models/products.mjs";

export const GetProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products, "Fetched products from DB"); // Log products fetched from MongoDB
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
