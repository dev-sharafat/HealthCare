import { NextFunction, Request, Response } from "express";
import z from "zod";
import { globalErrorHandler } from "./globalErorrHandler";

const validateRequest = (zodSchema: z.ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error: z.ZodError | any) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        error: globalErrorHandler(error, req, res, next),
      });
    }
  };
};

export default validateRequest;
