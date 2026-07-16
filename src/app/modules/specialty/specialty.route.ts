import express from "express";
import { SpecialtyController } from "./specialty.controller";

const specialtyRoutes = express.Router()

specialtyRoutes.post("/",SpecialtyController.postSpecialty);
specialtyRoutes.get("/",SpecialtyController.getSpecialty);
specialtyRoutes.patch("/:id",SpecialtyController.updateSpecialty);
specialtyRoutes.delete("/:id",SpecialtyController.deleteSpecialty);

export default specialtyRoutes;
