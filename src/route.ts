import { Router } from "express";
import authRouter from "./app/modules/auth/auth.route";
import specialtyRoutes from "./app/modules/specialty/specialty.route";
import userRouter from "./app/modules/user/user.route";

const appRouter = Router();

const moduleRouters = [
  { path: "/specialty", route: specialtyRoutes },
  { path: "/auth", route: authRouter },
  { path: "/user", route: userRouter },
];

moduleRouters.forEach((route) => {
  appRouter.use(route.path, route.route);
});
export default appRouter;
