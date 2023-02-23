import express from "express";
import { getUserBudget } from "../controller/budgetController";

const budgetRouter = express.Router();

budgetRouter.post("/", getUserBudget);

export { budgetRouter };
