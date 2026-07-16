import express, { Application } from "express";
import appRouter from "./route";
import { configs } from "./app/config";
import cors from "cors";
const app: Application = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api", appRouter);

// Basic route

export default app;
