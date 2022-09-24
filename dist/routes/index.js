"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_1 = __importDefault(require("./event"));
const event_2 = __importDefault(require("./event"));
const quotation_1 = __importDefault(require("./quotation"));
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const guest_1 = __importDefault(require("./guest"));
const routes = (0, express_1.Router)();
routes.get("/", (req, res) => {
    return res.json("Api running");
});
event_1.default.use(user_1.default);
routes.use(event_2.default);
routes.use(quotation_1.default);
routes.use(auth_1.default);
routes.use(guest_1.default);
exports.default = routes;
