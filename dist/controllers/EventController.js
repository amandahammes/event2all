"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const userRepository_1 = require("./../repositories/userRepository");
const eventRepository_1 = require("../repositories/eventRepository");
const quotationRepository_1 = require("../repositories/quotationRepository");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class EventController {
    static async createEvent(req, res) {
        let { user_id, place, name, date } = req.body;
        try {
            date = new Date(date).toISOString();
        }
        catch (error) {
            return res.status(406).send(error);
        }
        let user;
        console.log(date);
        try {
            user = await userRepository_1.userRepository.findOneOrFail({
                where: { id: Number(user_id) },
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                return res.status(404).send("User not found");
            }
            return res.status(500).json(error);
        }
        const newEvent = eventRepository_1.eventRepository.create({
            place,
            name,
            date,
            user_id: user,
        });
        const errors = await (0, class_validator_1.validate)(newEvent);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        try {
            await eventRepository_1.eventRepository.save(newEvent);
        }
        catch (error) {
            return res.status(500).json(error);
        }
        return res.status(201).json(newEvent);
    }
    static async getAllEvents(req, res) {
        let allEvents = [];
        try {
            allEvents = await eventRepository_1.eventRepository.find();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
        return res.status(200).send(allEvents);
    }
    static async getEventbyIdUser(req, res) {
        const { idUser } = req.params;
        let user;
        try {
            user = await userRepository_1.userRepository.findOneOrFail({
                where: { id: Number(idUser) },
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                return res.status(404).send("User not found");
            }
            return res.status(500).json(error);
        }
        let allEventsbyUser;
        try {
            allEventsbyUser = await eventRepository_1.eventRepository.find({
                where: { user_id: { id: Number(idUser) } }
            });
        }
        catch (error) {
            return res.status(500).json(error);
        }
        return res.send(allEventsbyUser);
    }
    static async editUser(req, res) {
        const id = req.params.id;
        let { place, name, date } = req.body;
        try {
            date = new Date(date).toISOString();
        }
        catch (error) {
            return res.status(406).send(error);
        }
        let event;
        try {
            event = await eventRepository_1.eventRepository.findOneOrFail({
                where: { id: Number(id) }
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                return res.status(404).send("User not found");
            }
            return res.status(500).json(error);
        }
        if (place) {
            event.place = place;
        }
        if (name) {
            event.name = name;
        }
        if (date) {
            event.date = date;
        }
        const errors = await (0, class_validator_1.validate)(event);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        try {
            await eventRepository_1.eventRepository.save(event);
        }
        catch (error) {
            return res.status(500).json(error);
        }
        return res.status(204).send();
    }
    static async deleteEvent(req, res) {
        const id = req.params.id;
        let event;
        try {
            event = await eventRepository_1.eventRepository.findOneOrFail({
                where: { id: Number(id) }
            });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                return res.status(404).send("User not found");
            }
            return res.status(500).json(error);
        }
        try {
            eventRepository_1.eventRepository.delete(id);
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                return res.status(400).json(error.message);
            }
            return res.status(500).json(error);
        }
        return res.status(204).send();
    }
    static async listAllExpected_Expense(req, res) {
        let id = req.params.id;
        let quotation;
        try {
            quotation = await quotationRepository_1.quotationRepository.createQueryBuilder("quotation").where("quotation.event_id = :event_id", { event_id: id }).addSelect("SUM(quotation.expected_expense)", "sum").groupBy("quotation.event_id").getRawOne();
        }
        catch (error) {
            return res.status(400).send(error);
        }
        try {
            const { quotation_event_id, sum } = quotation;
            let expected_sum_event = {
                event_id: quotation_event_id,
                expected_expense: sum
            };
            return res.json(expected_sum_event);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    static async listAllExpense(req, res) {
        const id = req.params.id;
        let quotation;
        try {
            quotation = await quotationRepository_1.quotationRepository.createQueryBuilder("quotation").where("quotation.event_id=:event_id", { event_id: id }).addSelect("SUM(quotation.actual_expense)", "sum").groupBy("quotation.event_id").getRawOne();
        }
        catch (error) {
            return res.status(400).send(error);
        }
        try {
            const { quotation_event_id, sum } = quotation;
            let actual_sum_event = {
                event_id: quotation_event_id,
                actual_expense: sum
            };
            return res.json(actual_sum_event);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}
exports.EventController = EventController;
