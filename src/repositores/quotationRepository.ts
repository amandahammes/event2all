import { Quotation } from './../entities/Quotation';
import { AppDataSource } from "../database/datasourse";

export const quotationRepository = AppDataSource.getRepository(Quotation);