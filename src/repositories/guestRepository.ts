import { AppDataSource } from "../datasource";
import { Guest } from "../entities/Guest";

export const guestRepository = AppDataSource.getRepository(Guest)