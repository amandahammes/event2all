"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const datasource_1 = require("../datasource");
const User_1 = require("../entities/User");
exports.userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
