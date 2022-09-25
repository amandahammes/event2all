import { User } from './../entities/User';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import bcrypt from "bcryptjs"

export class UserSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const userRepository = dataSource.getRepository(User)

        const userData = {
            name: 'admin',
            email:'admin@admin.com',
            password: await bcrypt.hash('adminadmin', 10),
        }

        const userExists = await userRepository.findOneBy({email: userData.email})

        if(!userExists){
            const newUser = userRepository.create(userData)
            await userRepository.save(newUser)
        }

    }
}
