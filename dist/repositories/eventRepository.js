"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRepository = void 0;
const Event_1 = require("./../entities/Event");
const datasource_1 = require("../datasource");
exports.eventRepository = datasource_1.AppDataSource.getRepository(Event_1.Event);
