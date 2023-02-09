import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../utils/ErrorResponse";

export const serverErrorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {
    return res
        .status(500)
        .json(new ErrorResponse("error", "Internal error: " + error.message));
};
