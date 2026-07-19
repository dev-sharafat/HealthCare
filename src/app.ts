import express, { Application } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErorrHandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import appRouter from "./route";
const app: Application = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api", appRouter);

app.use(globalErrorHandler);
app.use(notFoundRoute);
// Basic route

export default app;
