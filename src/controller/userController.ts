import { RequestHandler } from "express";
import { mockend } from "../config/api";
import { UserService } from "../services/userService";
import { User } from "../types/User";
import { CustomResponse } from "../utils/CustomResponse";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const userService = new UserService(mockend);
        const users: User[] = await userService.getUsers();
        return res.status(200).json(new CustomResponse("success", users));
    } catch (error) {
        next(error);
    }
};
