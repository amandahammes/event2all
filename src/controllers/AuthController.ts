import { validate } from 'class-validator'
import { User } from './../entities/User'
<<<<<<< HEAD
import { userRepository } from './../repositories/userRepository'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { Request, Response } from 'express';

export class AuthController {

    static async auth(req: Request, res: Response) {
=======
import { userRepository } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

export class AuthController {

    async login(req: Request, res: Response) {
>>>>>>> 03665f06cb379f21d6cbad4bd162fa6e82aac796
        const {email, password} = req.body

        if(typeof password != "string"){
            return res.status(404).send("Invalid type of parameters on request")
        }

        let user: User

        try {
            user = await userRepository.findOneOrFail({where: {email}})
        } catch (error) {
            return res.status(404).send("User not found!")
        }

        if(!user.checkIfUnencryptedPasswordIsValid(password)){
            return res.status(401).send("Email or password not valid!")
        }

<<<<<<< HEAD
        const token = jwt.sign({id: user.id}, "123456" ?? '', {expiresIn: '8h'}) //Alterar o jwt secret
=======
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET ?? '', {expiresIn: '8h'})
>>>>>>> 03665f06cb379f21d6cbad4bd162fa6e82aac796

        const {password: _, ...userLogin} = user
        
        return res
            .cookie("token", token)
            .json({
            user: userLogin,
            token: token,
        })
    }

    static changePassword = async (req:Request, res:Response) =>{
        const token : string  = req.cookies
        console.log(token)

        if (!token) {
            return res.status(401).end()
        }

        let payload

	    try {
		    payload = jwt.verify(token, "123456");
	    } catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	    }

        const {id} : any = payload
        
        let {oldPassword, newPassword} = req.body

        if(!(oldPassword && newPassword)){
            return res.status(400).send()
        }

        let user: User
        try {
            user = await userRepository.findOneOrFail({where:{id}})
        } catch (error) {
            return res.status(401).send("Old password not match")
        }

        if(!user.checkIfUnencryptedPasswordIsValid(oldPassword)){
            return res.status(401).send("Old password not match")
        }

        const errors = await validate(user)
        if(errors.length > 0) {
            return res.status(400).send(errors)
        }
        newPassword = bcrypt.hashSync(newPassword, 10);
        user.password = newPassword;
        

        userRepository.save(user)

        return res.status(204).send("Password changed!")
    }
}