import { Router } from "express";
import specialtyRoutes from "./app/modules/specialty/specialty.route";

const appRouter= Router()

const moduleRouters = [
    {path:"/specialty",route:specialtyRoutes},
]

moduleRouters.forEach((route)=>{
    appRouter.use(route.path,route.route)
})
export default appRouter;