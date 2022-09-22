import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"

export const checkJwt = (req:Request, res:Response, next: NextFunction) => {
    const token = <any>req.headers["auth"]
    let jwtPayLoad

    try {
        jwtPayLoad = <any>jwt.verify(token, process.env.JWT_PASS) //process.env.JWT_SECRET
        res.locals.jwtPayLoad = jwtPayLoad
    } catch (error) {
        return res.status(401).send()
    }

    const {id, email} = jwtPayLoad
    const newToken = jwt.sign({id, email}, process.env.JWT_PASS, {expiresIn: "8h"})
    res.setHeader("token", newToken)
    res.send({id,email});

    next()
}