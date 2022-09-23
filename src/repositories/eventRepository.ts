import { Event } from './../entities/Event';
import { AppDataSource } from "../database/datasource";

export const eventRepository = AppDataSource.getRepository(Event);