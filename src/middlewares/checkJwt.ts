import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";


export const checkJwt = (req:Request, res:Response, next:NextFunction) =>{
    const token = <any>req.cookies
    let jwtPayLoad

    try{
        jwtPayLoad = <any>jwt.verify(token, "123456")
        res.cookie("token", jwtPayLoad)
    }catch(error:any){
        return res.status(401).send()
    };

    
    const {id, email} = jwtPayLoad;
    const newToken = jwt.sign({id, email}, "123456", {
        expiresIn: "1h"
    })

     res.setHeader("token", newToken)

    next()
}
