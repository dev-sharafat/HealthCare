import { Request } from "express";
import { auth } from "../../lib/auth";

const registerUserData = async (req: Request) => {
  const { name, email, password } = req.body;
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  return result;
};
const loginUserData = async (req: Request) => {
  const { email, password } = req.body;
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    headers: await new Headers(),
  });

  return result;
};

export const AuthService = {
  registerUserData,
  loginUserData,
};
