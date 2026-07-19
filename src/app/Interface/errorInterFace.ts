export interface ErrorInterface {
    success: boolean;
    error?: string;
    errorSource: IZodErrorSource[];
    message: string;
    statusCode: number;
    stack ?:string
}
export interface IZodErrorSource {
  path: string;
  message: string;
}