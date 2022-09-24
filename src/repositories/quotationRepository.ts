import { Quotation } from './../entities/Quotation';
import { AppDataSource } from "../datasource";


export const quotationRepository = AppDataSource.getRepository(Quotation);