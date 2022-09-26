"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const class_validator_1 = require("class-validator");
const userRepository_1 = require("./../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    static async auth(req, res) {
        var _b;
        const { email, password } = req.body;
        if (typeof password != "string") {
            return res.status(404).send("Invalid type of parameters on request");
        }
        let user;
        try {
            user = await userRepository_1.userRepository.findOneOrFail({ where: { email } });
        }
        catch (error) {
            return res.status(404).send("User not found!");
        }
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send("Email or password not valid!");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '', { expiresIn: '8h' }); //Alterar o jwt secret
        const { password: _, ...userLogin } = user;
        return res
            .json({
            user: userLogin,
            token: token,
        });
    }
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.changePassword = async (req, res) => {
    var _b;
    const token = req.headers["auth"];
    if (!token) {
        return res.status(401).send("Not logged.");
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "");
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    }
    const { id } = payload;
    let { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        return res.status(400).send();
    }
    let user;
    try {
        user = await userRepository_1.userRepository.findOneOrFail({ where: { id } });
    }
    catch (error) {
        return res.status(401).send("Old password not match");
    }
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        return res.status(401).send("Old password not match");
    }
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        return res.status(400).send(errors);
    }
    newPassword = bcryptjs_1.default.hashSync(newPassword, 10);
    user.password = newPassword;
    userRepository_1.userRepository.save(user);
    return res.status(204).send("Password changed!");
};
