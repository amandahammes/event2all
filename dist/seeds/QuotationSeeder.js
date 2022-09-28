"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationSeeder = void 0;
const quotationRepository_1 = require("./../repositories/quotationRepository");
const eventRepository_1 = require("./../repositories/eventRepository");
class QuotationSeeder {
    async run(dataSource, factoryManager) {
        const description = "Músicos";
        const provider = "Banda Eva";
        const expected_expense = 100.000;
        const amount_already_paid = 2.000;
        const eventSeed = await eventRepository_1.eventRepository.findOneBy({ id: Number(1) });
        if (eventSeed) {
            const newQuotation = quotationRepository_1.quotationRepository.create({
                description,
                provider,
                expected_expense,
                amount_already_paid
            });
            await quotationRepository_1.quotationRepository.save(newQuotation);
        }
    }
}
exports.QuotationSeeder = QuotationSeeder;
