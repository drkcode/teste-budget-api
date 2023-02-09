import { RequestHandler } from "express-serve-static-core";
import { ErrorResponse } from "../utils/ErrorResponse";

export const notFoundErrorHandler: RequestHandler = (req, res) =>
    res.status(404).json(new ErrorResponse("fail", "Resource not found."));
