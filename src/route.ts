import { Router } from "express";
import authRouter from "./app/modules/auth/auth.route";
import specialtyRoutes from "./app/modules/specialty/specialty.route";

const appRouter = Router();

const moduleRouters = [
  { path: "/specialty", route: specialtyRoutes },
  { path: "/auth", route: authRouter },
];

moduleRouters.forEach((route) => {
  appRouter.use(route.path, route.route);
});
export default appRouter;
