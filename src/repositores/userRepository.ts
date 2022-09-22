import { AppDataSource } from './../database/datasourse';
import { User } from './../entities/User'

export const userRepository = AppDataSource.getRepository(User)