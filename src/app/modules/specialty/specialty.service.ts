import { Request } from "express";
import { Specialty } from "../../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const postSpecialtyData = async (payload: Specialty) => {
  const result = await prisma.specialty.create({
    data: payload,
  });
  return result;
};
const getSpecialtyData = async (payload: Specialty) => {
  const result = await prisma.specialty.findMany({});
  return result;
};

const updateSpecialtyData = async (req: Request) => {
  const id = req.params.id as string;
  const payload = req.body as Specialty;
  const findSpecialty = await prisma.specialty.findUnique({
    where: {
      id: id,
    },
  });
  if (!findSpecialty) {
    throw new Error("Specialty not found");
  }
  const result = await prisma.specialty.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteSpecialtyData = async (req: Request) => {
  const id = req.params.id as string;
  const findSpecialty = await prisma.specialty.findUnique({
    where: {
      id: id,
    },
  });
  if (!findSpecialty) {
    throw new Error("Specialty not found");
  }
  const result = await prisma.specialty.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const SpecialtyService = {
  postSpecialtyData,
  getSpecialtyData,
  updateSpecialtyData,
  deleteSpecialtyData,
};
