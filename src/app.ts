import express from "express";
import { notFoundErrorHandler } from "./middleware/notFoundErrorHandler";
import { serverErrorHandler } from "./middleware/serverErrorHandler";
import { productRouter } from "./routes/productRouter";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(notFoundErrorHandler);

app.use(serverErrorHandler);

export { app };
