"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
// import { GuestSeeder } from './GuestSeeder';
const typeorm_extension_1 = require("typeorm-extension");
// import { QuotationSeeder } from "./QuotationSeeder";
const UserSeeder_1 = require("./UserSeeder");
class MainSeeder {
    async run(dataSource, factoryManager) {
        await (0, typeorm_extension_1.runSeeder)(dataSource, UserSeeder_1.UserSeeder);
        // await runSeeder(dataSource, GuestSeeder)
        // await runSeeder(dataSource, QuotationSeeder)       
    }
}
exports.MainSeeder = MainSeeder;
