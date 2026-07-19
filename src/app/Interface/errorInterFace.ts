export interface ErrorInterface {
    success: boolean;
    error: string;
    errorSource: IZodErrorSource[];
    message: string;
    statusCode: number;
}
export interface IZodErrorSource {
  path: string;
  message: string;
}