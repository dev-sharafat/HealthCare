import { Request } from "express";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IRegisterUserData } from "./auth.instance";

const registerUserData = async (payload: IRegisterUserData) => {
  const { name, email, password } = payload;
  const userData = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!userData.user) {
    throw new Error("The user data is not created");
  }

  try {

    const patient = await prisma.$transaction(async (tx) => {
      const patientData = await tx.patient.create({
        data: {
          userId: userData.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
      return patientData;
    });

    return {
      ...userData,
      patient,
    };


  } catch (error) {
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw error;
  }
};


const loginUserData = async (req: Request) => {
  const { email, password } = req.body;
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    }
  });

  return result;
};

export const AuthService = {
  registerUserData,
  loginUserData,
};
