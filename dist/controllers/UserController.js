"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_validator_1 = require("class-validator");
const userRepository_1 = require("../repositories/userRepository");
const typeorm_1 = require("typeorm");
class UserController {
    static async createUser(req, res) {
        const { name, email, password } = req.body;
        if (typeof password != "string") {
            return res.status(404).send("Invalid type of parameters on request!");
        }
        const encryptedPw = bcryptjs_1.default.hashSync(password, 10);
        const user = userRepository_1.userRepository.create({
            name,
            email,
            password: encryptedPw,
        });
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        try {
            const userWithSameEmail = await userRepository_1.userRepository.findOne({
                where: { email: user.email },
            });
            if (userWithSameEmail)
                return res.status(409).send("Email already in use");
            await userRepository_1.userRepository.save(user);
        }
        catch (error) {
            return res.status(500).json(error);
        }
        return res.status(201).json(user);
    }
    static async deleteUser(req, res) {
        const id = req.params.id;
        let user;
        try {
            user = await userRepository_1.userRepository.findOneOrFail({ where: { id: Number(id) } });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError)
                return res.status(404).send("User not found");
            return res.status(500).json(error);
        }
        try {
            userRepository_1.userRepository.delete(id);
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError)
                return res.status(400).json(error.message);
            return res.status(500).json(error);
        }
        return res.status(204).send();
    }
    static async editUser(req, res) {
        const id = req.params.id;
        const { name, email } = req.body;
        let user;
        try {
            user = await userRepository_1.userRepository.findOneOrFail({ where: { id: Number(id) } });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError)
                return res.status(404).send("User not found");
            return res.status(500).json(error);
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        try {
            const userWithSameEmail = await userRepository_1.userRepository.findOne({
                where: { email: user.email },
            });
            if (userWithSameEmail)
                return res.status(409).send("Email already in use");
            await userRepository_1.userRepository.save(user);
        }
        catch (error) {
            return res.status(500).json(error);
        }
        return res.status(204).send();
    }
    static async listAll(req, res) {
        let users = [];
        try {
            users = await userRepository_1.userRepository.find({
                select: ["id", "name", "email"],
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError)
                return res.status(404).send("No users to show");
            return res.status(500).json(error);
        }
        return res.status(200).send(users);
    }
    static async getOneById(req, res) {
        const id = req.params.id;
        let user;
        try {
            user = await userRepository_1.userRepository.findOneOrFail({
                where: { id: Number(id) },
                select: ["id", "name", "email"],
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError)
                return res.status(404).send("User not found");
            return res.status(500).json(error);
        }
        return res.status(200).send(user);
    }
}
exports.UserController = UserController;
