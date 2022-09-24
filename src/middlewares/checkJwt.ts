// import {Request, Response, NextFunction} from "express";
// import * as jwt from "jsonwebtoken";


// export const checkJwt = (req:Request, res:Response, next:NextFunction) =>{
//     const token = req.cookies.token
//     console.log(token)

//     if (!token) {
//         return res.status(401).end()
//     }

//     let payload

//     try {
//         payload = jwt.verify(token, process.env.JWT_SECRET??"");
//     } catch (error) {
//     if (error instanceof jwt.JsonWebTokenError) {
//         return res.status(401).end()
//     }
//     return res.status(400).end()
//     }
//     next()
// }
