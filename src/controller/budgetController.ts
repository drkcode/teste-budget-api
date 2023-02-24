import { RequestHandler } from "express";
import { mockend } from "../config/api";
import { BudgetService } from "../services/budgetService";
import { ProductService } from "../services/productService";
import { UserService } from "../services/userService";
import { CustomResponse } from "../utils/CustomResponse";
import { ErrorResponse } from "../utils/ErrorResponse";
import { ResourceNotFoundError } from "../utils/ResourceNotFoundError";

interface BudgetRequest {
    user_id: number;
    product_ids: number[];
}

export const getUserBudget: RequestHandler = async (req, res, next) => {
    const budgetService = new BudgetService(
        new UserService(mockend),
        new ProductService(mockend)
    );
    const request: BudgetRequest = req.body;
    const { user_id: userId, product_ids: productIds } = request;
    try {
        if (!userId || !productIds) {
            return res
                .status(422)
                .json(
                    new ErrorResponse(
                        "fail",
                        "the request json is invalid. check the correct json properties"
                    )
                );
        }
        const userBudget = await budgetService.calcBudget(userId, productIds);
        if (userBudget) {
            return res.status(200).json(
                new CustomResponse("success", {
                    user_id: request.user_id,
                    user_budget: userBudget,
                })
            );
        }
        return res
            .status(404)
            .json(
                new ErrorResponse(
                    "fail",
                    "can't calc the user budget. check user id and product ids"
                )
            );
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return res
                .status(404)
                .json(new ErrorResponse(error.status, error.message));
        }
        next(error);
    }
};
