"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = require("./datasource");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// var cool = require('cool-ascii-faces');
var cors = require('cors');
datasource_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use(cors());
    app.use(express_1.default.json());
    app.use(routes_1.default);
    return app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}).catch((error) => console.log(error));
