"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestRepository = void 0;
const datasource_1 = require("../datasource");
const Guest_1 = require("../entities/Guest");
exports.guestRepository = datasource_1.AppDataSource.getRepository(Guest_1.Guest);
