import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.mjs";
import productsRoutes from "./routes/products.mjs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api", productsRoutes);

const PORT = process.env.PORT;
const MONGOURI = process.env.MONGO_URI;
mongoose
  .connect(MONGOURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
