import { NextFunction, Request, RequestHandler, Response } from "express";
import { mockend } from "../config/api";
import { Product } from "../types/Product";
import { CustomResponse } from "../utils/CustomResponse";

export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const response = await mockend.get("products");
        const products: Product[] = response.data;
        return res.status(200).json(new CustomResponse("success", products));
    } catch (error) {
        next(error);
    }
};
