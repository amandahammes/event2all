import { User } from './../entities/User';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { Event } from '../entities/Event';

export class EventSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const eventRepository = dataSource.getRepository(Event)
        const userRepository = dataSource.getRepository(User)
        
        const place = "Ibiza"
        const name = "Casamento"
        const date = "10/12/2022"
        
        const userSeed = await userRepository.findOneBy({id: Number(1)})

        if (userSeed) {
            const newEvent = eventRepository.create({
                place,
                name,
                date
            })
            await eventRepository.save(newEvent)
        }
    }
}
