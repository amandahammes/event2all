import { EventSeeder } from './EventSeeder';
import { DataSource } from "typeorm"
import { GuestSeeder } from './GuestSeeder';
import { Seeder, runSeeder, SeederFactoryManager } from "typeorm-extension"
import { QuotationSeeder } from "./QuotationSeeder";
import { UserSeeder } from "./UserSeeder";

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        await runSeeder(dataSource, UserSeeder)
        await runSeeder(dataSource, EventSeeder)    
        await runSeeder(dataSource, GuestSeeder)
        await runSeeder(dataSource, QuotationSeeder)       
    }
}