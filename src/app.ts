
import express,{ Application, Request, Response } from 'express';
import { prisma } from './app/lib/prisma';
import appRouter from './route';



const app: Application = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api",appRouter)

// Basic route

export default app;