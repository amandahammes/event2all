import { User } from './../entities/User';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { Event } from '../entities/Event';

export class EventSeeder implements Seeder {

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const eventRepository = dataSource.getRepository(Event);
        const userRepository = dataSource.getRepository(User);
        const event = {
        place : "Ibiza",
        name : "Casamento",
        date:"2022/12/20",
        // user_id:1
        }
        await eventRepository.insert(event);
    }

    // public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
    //     const eventRepository = dataSource.getRepository(Event)
    //     const userRepository = dataSource.getRepository(User)

    //     const place = "Ibiza"
    //     const name = "Casamento"
    //     const date = new Date("2022/01/01").toISOString();
        

    //     const userSeed = await userRepository.findOneBy({id: Number(1)})

    //     if (userSeed) {
    //         const newEvent = eventRepository.create({
    //             place,
    //             name,
    //             date
    //         })
    //         await eventRepository.insert(newEvent)
    //     }
    // }
}