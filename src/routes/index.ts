import { Router, Request, Response } from "express";
import event from "./event"

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json("Api running");
});

routes.use(event);

export default routes;