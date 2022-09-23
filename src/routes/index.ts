import { Router, Request, Response } from "express";
import event from "./event";
import quotation from "./quotation";
import user from "./user";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json("Api running");
});

routes.use(event);
routes.use(user);
routes.use("/quotation", quotation);

export default routes;