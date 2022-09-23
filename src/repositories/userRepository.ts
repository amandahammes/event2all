import { AppDataSource } from './../database/datasource';
import { User } from './../entities/User'

export const userRepository = AppDataSource.getRepository(User)