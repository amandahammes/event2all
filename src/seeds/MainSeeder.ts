import { DataSource } from "typeorm"
import { GuestSeeder } from './GuestSeeder';
import { Seeder, runSeeder, SeederFactoryManager } from "typeorm-extension"
import { QuotationSeeder } from "./QuotationSeeder";
import { UserSeeder } from "./UserSeeder";
import { EventSeeder } from "./EventSeeder";


export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        await runSeeder(dataSource, UserSeeder)
        // await runSeeder(dataSource, EventSeeder)
        // await runSeeder(dataSource, QuotationSeeder)       
        // await runSeeder(dataSource, GuestSeeder)
    }
}