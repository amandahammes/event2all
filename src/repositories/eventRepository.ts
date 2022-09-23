import { Event } from './../entities/Event';
import { AppDataSource } from "../../src/database/datasourse";

export const eventRepository = AppDataSource.getRepository(Event);