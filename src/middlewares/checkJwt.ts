import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";


export const checkJwt = (req:Request, res:Response, next:NextFunction) =>{
    const token = <any>req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return res.status(401).send("Not logged.")
    }
    let jwtPayLoad

    try{
        jwtPayLoad = <any>jwt.verify(token, process.env.JWT_SECRET??"")
        res.locals.jwtPayload = jwtPayLoad
    }catch(error:any){
        return res.status(401).send()
    };

    
    const {id, email} = jwtPayLoad;
    const newToken = jwt.sign({id, email}, process.env.JWT_SECRET??"", {
        expiresIn: "1h"
    })

     res.setHeader("Authorization", "Bearer " + newToken)

    next()
}
