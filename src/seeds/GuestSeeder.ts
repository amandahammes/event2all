import { eventRepository } from './../repositories/eventRepository';
import { guestRepository } from './../repositories/guestRepository';
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class GuestSeeder implements Seeder {
    async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const name = "Aline"
        const email = "aline@gmail.com"
        const phone = "123456789"

        const eventSeed = await eventRepository.findOneBy({id: Number(1)})

        if (eventSeed) {
            const newGuest = guestRepository.create({
                name,
                email,
                phone
            })
            await guestRepository.save(newGuest)
        }

    }
}