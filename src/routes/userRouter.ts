import express from "express";
import { getUsers } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => getUsers(req, res, next));
userRouter.get("/2", (req, res) => res.json("test"));

export { userRouter };
