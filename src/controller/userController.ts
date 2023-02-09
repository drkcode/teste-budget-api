import { NextFunction, Request, RequestHandler, Response } from "express";
import { mockend } from "../config/api";
import { CustomResponse } from "../utils/CustomResponse";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const response = await mockend.get("users");
        const users = response.data;
        return res.status(200).json(new CustomResponse("success", users));
    } catch (error) {
        next(error);
    }
};
