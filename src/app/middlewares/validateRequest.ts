import { NextFunction, Request, Response } from "express";
import z from "zod";

const validateRequest =(zodSchema:z.ZodObject)=>{
    return async (req: Request, res: Response, next: NextFunction) => {
       try{
        req.body = await zodSchema.parseAsync(req.body);
        next();
       }catch(error:z.ZodError | any){
        res.status(400).json({
            success: false,
            message: "Validation Error",
            error: error.message,
          });
       }
    }
}

export default validateRequest;