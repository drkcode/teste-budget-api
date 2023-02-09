import express from "express";
import { getProducts } from "../controller/productController";

const productRouter = express.Router();

productRouter.get("/", getProducts);

export { productRouter };
