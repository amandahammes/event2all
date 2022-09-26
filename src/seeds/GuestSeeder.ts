import { Guest } from './../entities/Guest';
import { Event } from './../entities/Event';
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class GuestSeeder implements Seeder {
    public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const name = "Aline"
        const email = "aline@gmail.com"
        const phone = "123456789"
        const  eventRepository = dataSource.getRepository(Event)
        const  guestRepository = dataSource.getRepository(Guest)
        const eventSeed = await eventRepository.findOneBy({id: Number(1)})

        if (eventSeed) {
            const newGuest = guestRepository.create({
                name,
                email,
                phone
            })
            await guestRepository.insert(newGuest)
        }

    }
}