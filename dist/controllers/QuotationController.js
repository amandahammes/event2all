"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationController = void 0;
const eventRepository_1 = require("../repositories/eventRepository");
const quotationRepository_1 = require("../repositories/quotationRepository");
const class_validator_1 = require("class-validator");
class QuotationController {
    static async createQuotation(req, res) {
        const { event_id, description, provider, expected_expense } = req.body;
        let event;
        try {
            event = await eventRepository_1.eventRepository.findOneOrFail({ where: { id: event_id } });
        }
        catch (error) {
            return res.status(404).send("Event Not Found");
        }
        const newQuotation = quotationRepository_1.quotationRepository.create({
            event_id,
            description,
            provider,
            expected_expense,
            actual_expense: 0,
            amount_already_paid: 0,
        });
        await quotationRepository_1.quotationRepository.save(newQuotation);
        return res.status(201).send("Quotation created.");
    }
    ;
    static async getQuotationById(req, res) {
        let id_quotation = req.params.id;
        let quotation;
        try {
            quotation = await quotationRepository_1.quotationRepository.findOneOrFail({ where: { id: Number(id_quotation) } });
        }
        catch (error) {
            return res.status(404).send("Quotation does not exist.");
        }
        ;
        return res.status(200).send(quotation);
    }
    ;
    static async editQuotation(req, res) {
        let id_quotation = req.params.id;
        const { description, provider, expected_expense, actual_expense, amount_already_paid } = req.body;
        let quotation;
        try {
            quotation = await quotationRepository_1.quotationRepository.findOneOrFail({ where: { id: Number(id_quotation) } });
        }
        catch (error) {
            return res.status(404).send("Id not Found!");
        }
        try {
            quotation.description = description;
            quotation.provider = provider;
            quotation.expected_expense = expected_expense;
            quotation.actual_expense = actual_expense;
            quotation.amount_already_paid = amount_already_paid;
        }
        catch (error) {
            res.status(400).send("No valid body sent.");
        }
        ;
        const validation = await (0, class_validator_1.validate)(quotation);
        if (validation.length > 0) {
            return res.status(400).send(validation);
        }
        ;
        try {
            await quotationRepository_1.quotationRepository.save(quotation);
        }
        catch (error) {
            return res.status(400).send(error);
        }
        ;
        return res.status(200).send("Quotation updated");
    }
    ;
    static async getAllQuotationByEventId(req, res) {
        const event_id = req.params;
        let event;
        try {
            event = await eventRepository_1.eventRepository.findOneOrFail({ where: { id: Number(event_id) } });
        }
        catch (error) {
            return res.status(404).send("Event Not Found");
        }
        let quotation;
        try {
            quotation = await quotationRepository_1.quotationRepository.find({
                where: {
                    event_id: event_id
                }
            });
            return res.status(200).send(quotation);
        }
        catch (error) {
            return res.status(404).send(error);
        }
    }
    static async deleteQuotation(req, res) {
        let id_quotation = req.params;
        let quotation;
        try {
            quotation = await quotationRepository_1.quotationRepository.findOneOrFail({ where: { id: Number(id_quotation) } });
        }
        catch (error) {
            return res.status(404).send("Id not Found!");
        }
        quotationRepository_1.quotationRepository.delete(id_quotation);
        return res.status(204).send();
    }
}
exports.QuotationController = QuotationController;
