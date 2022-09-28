"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const userData = {
            name: 'admin',
            email: 'admin@admin.com',
            password: await bcryptjs_1.default.hash('123456', 8),
        };
        const userExists = await userRepository.findOneBy({ email: userData.email });
        if (!userExists) {
            const newUser = userRepository.create(userData);
            await userRepository.save(newUser);
        }
    }
}
exports.UserSeeder = UserSeeder;
