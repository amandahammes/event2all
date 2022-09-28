import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = <any>req.headers["auth"];
  if (!token) {
    return res.status(401).send("Not logged.");
  }
  next();
};
