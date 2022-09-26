import { Quotation } from "../entities/Quotation";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Event } from '../entities/Event';

export class QuotationSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const quotationRepository = dataSource.getRepository(Quotation)

        await quotationRepository.insert([{
            description: "Músicos",
            provider: "Banda Eva",
            expected_expense : 100000,
            amount_already_paid: 20000
        }])
    }
}


