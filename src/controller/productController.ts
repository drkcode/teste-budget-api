import { RequestHandler } from "express";
import { mockend } from "../config/api";
import { ProductService } from "../services/productService";
import { CustomResponse } from "../utils/CustomResponse";

export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const service = new ProductService(mockend);
        const products = await service.getProducts();
        return res.status(200).json(new CustomResponse("success", products));
    } catch (error) {
        next(error);
    }
};
