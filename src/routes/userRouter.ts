import express from "express";
import { getUsers } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/", getUsers);

export { userRouter };
