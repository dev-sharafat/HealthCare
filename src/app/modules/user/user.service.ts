import status from "http-status";
import { Role, Specialty } from "../../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createUserIntoDb = async (payload: ICreateDoctorPayload) => {
  const specialties: Specialty[] = [];

  for (const specialtyId of payload.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });

    if (!specialty) {
      throw new AppError(status.NOT_FOUND,"specialty is not found!!!");
    }

    specialties.push(specialty);
  }

  const isUserExisted = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });

  if (isUserExisted) {
    throw new AppError(status.ALREADY_REPORTED,"User already existed");
  }
  const createUser = await auth.api.signUpEmail({
    body: {
      name: payload.doctor.name,
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      needPasswordChange: true,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: createUser.user.id,
          ...payload.doctor,
        },
      });

      const doctorSpecialtyData = specialties.map((specialty) => {
        return {
          doctorId: doctorData.id,
          specialtyId: specialty.id,
        };
      });
      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtyData,
      });

      // Now we need to return the doctor data so we need to throw a findUnique query
      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experience: true,
          gender: true,
          appointmentFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          userId: true,
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              needPasswordChange: true,
              status: true,
              id: true,
              createdAt: true,
              updatedAt: true,
              isDeleted: true,
            },
          },
          specialties: {
            select: {
              specialty: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      return doctor;
    });
    return result;
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        id: createUser.user.id,
      },
    });
    return error;
  }
};

export const UserService = {
  createUserIntoDb,
};
