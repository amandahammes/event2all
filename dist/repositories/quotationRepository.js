"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationRepository = void 0;
const datasource_1 = require("../datasource");
const Quotation_1 = require("./../entities/Quotation");
exports.quotationRepository = datasource_1.AppDataSource.getRepository(Quotation_1.Quotation);
