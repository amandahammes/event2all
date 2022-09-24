import { AppDataSource } from "../datasource";
import { Quotation } from './../entities/Quotation';


export const quotationRepository = AppDataSource.getRepository(Quotation);