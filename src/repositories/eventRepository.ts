import { Event } from './../entities/Event';
import { AppDataSource } from "../datasource";

export const eventRepository = AppDataSource.getRepository(Event);