import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    image: {
      type: mongoose.Schema.Types.String,
    },

    description: { type: mongoose.Schema.Types.String },
  },

  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", productsSchema);
