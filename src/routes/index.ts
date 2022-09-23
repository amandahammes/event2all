import { Router, Request, Response } from "express";
import event from "./event";
import quotation from "./quotation";
import user from "./user";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json("Api running");
});

routes.use(event);
routes.use(quotation);
routes.use(user);

export default routes;