import { Response, Request } from "express";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import { userRepository } from "../repositories/userRepository";
import { QueryFailedError, EntityNotFoundError } from "typeorm";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (typeof password != "string") {
      return res.status(404).send("Invalid type of parameters on request!");
    }

    const encryptedPw = bcrypt.hashSync(password, 10);
    const user: User = userRepository.create({
      name,
      email,
      password: encryptedPw,
    });

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      const userWithSameEmail = await userRepository.findOne({
        where: { email: user.email },
      });
      if (userWithSameEmail)
        return res.status(409).send("Email already in use");
      await userRepository.save(user);
    } catch (error) {
      return res.status(500).json(error);
    }

    return res.status(201).json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: Number(id) } });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("User not found");
      return res.status(500).json(error);
    }

    try {
      userRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError)
        return res.status(400).json(error.message);
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async editUser(req: Request, res: Response) {
    const id = req.params.id;

    const { name, email } = req.body;
    //busca um usuário com o id enviado
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: Number(id) } });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("User not found");
      return res.status(500).json(error);
    }
    //checa se veio email e nome na requisiçao e verfica se ja existe o email cadastrado
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
      try {
        const userWithSameEmail = await userRepository.findOne({
          where: { email: user.email },
        });
        if (userWithSameEmail)
          return res.status(409).send("Email already in use");
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    //valida o usuário
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    //salva o usuário no banco
    try {
      await userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError)
        return res.status(400).json(error.message);
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async listAll(req: Request, res: Response) {
    let users: Array<User> = [];
    try {
      users = await userRepository.find({
        select: ["id", "name", "email"],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("No users to show");
      return res.status(500).json(error);
    }
    return res.status(200).send(users);
  }

  static async getOneById(req: Request, res: Response) {
    const id = req.params.id;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(id) },
        select: ["id", "name", "email"],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("User not found");
      return res.status(500).json(error);
    }

    return res.status(200).send(user);
  }
}
