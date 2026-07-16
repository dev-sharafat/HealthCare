import { Response } from "express";

interface ISendResponse<T> {
    httpStatusCode: number;
    message: string;
    success: boolean;
    data?: any;
}
export const sendResponse = <T>(res:Response,responseData:ISendResponse<T>)=>{
    const {httpStatusCode,message,success,data}= responseData;
    res.status(httpStatusCode).json({
        success,
        message,
        data
    })
}