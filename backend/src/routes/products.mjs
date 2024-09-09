import { Router } from "express";
import { GetProductsController } from "../controllers/products.mjs";

const router = Router();

router.get("/products", GetProductsController);

export default router;
