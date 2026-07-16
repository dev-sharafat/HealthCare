import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SpecialtyService } from "./specialty.service";

const postSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.postSpecialtyData(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});
const getSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.getSpecialtyData(payload);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialties fetched successfully",
    data: result,
  });
});
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyService.updateSpecialtyData(req);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialties fetched successfully",
    data: result,
  });
});
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyService.deleteSpecialtyData(req);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialties fetched successfully",
    data: result,
  });
});

export const SpecialtyController = {
  postSpecialty,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
