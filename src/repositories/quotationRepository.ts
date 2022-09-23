import { Quotation } from './../entities/Quotation';
import { AppDataSource } from "../database/datasource";

export const quotationRepository = AppDataSource.getRepository(Quotation);