"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
const GuestSeeder_1 = require("./GuestSeeder");
const typeorm_extension_1 = require("typeorm-extension");
const QuotationSeeder_1 = require("./QuotationSeeder");
const userSeeder_1 = require("./userSeeder");
class MainSeeder {
    async run(dataSource, factoryManager) {
        await (0, typeorm_extension_1.runSeeder)(dataSource, userSeeder_1.UserSeeder);
        await (0, typeorm_extension_1.runSeeder)(dataSource, GuestSeeder_1.GuestSeeder);
        await (0, typeorm_extension_1.runSeeder)(dataSource, QuotationSeeder_1.QuotationSeeder);
    }
}
exports.MainSeeder = MainSeeder;
