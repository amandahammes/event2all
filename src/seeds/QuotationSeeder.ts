import { quotationRepository } from './../repositories/quotationRepository';
import { Quotation } from "../entities/Quotation";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { eventRepository } from './../repositories/eventRepository';

export class QuotationSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const description = "Músicos"
        const provider = "Banda Eva"
        const expected_expense = 100.000
        const amount_already_paid = 2.000

        const eventSeed = await eventRepository.findOneBy({id: Number(1)})

        if (eventSeed) {
            const newQuotation = quotationRepository.create({
                description,
                provider,
                expected_expense,
                amount_already_paid
            })
            await quotationRepository.save(newQuotation)
        }
    }
}


