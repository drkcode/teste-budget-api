import express from "express";
import { errorMiddleware } from "./middleware/ErrorMiddleware";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use(errorMiddleware);

export { app };
