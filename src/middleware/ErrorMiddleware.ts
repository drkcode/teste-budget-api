import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/ErrorResponse";

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).json(
        new ErrorResponse("error", "Internal error: " + error.message)
    );
};
