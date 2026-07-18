import { Request } from "express";

const createUserIntoDb = async (req: Request) => {
  console.log(JSON.stringify(req.body));
};

export const UserService = {
  createUserIntoDb,
};
