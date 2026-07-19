import status from "http-status";
import z from "zod";
import { IZodErrorSource } from "../Interface/errorInterFace";

export const zodErrorHelper = (err: z.ZodError) => {
  const statusCode = status.BAD_REQUEST;
  const message = "Zod Validation Error";
  const errorSource: IZodErrorSource[] = [];

  err.issues.forEach((issue) => {
    errorSource.push({
      path: issue.path.join("/ "),
      message: issue.message,
    });
  });
  return {
    statusCode,
    message,
    errorSource,
    success: false,
  };
};
