import { eventRepository } from './../repositores/eventRepository';
import { quotationRepository } from './../repositores/quotationRepository';
import { Quotation } from "./../entities/Quotation";
import { Response, Request } from "express";
import { validate } from "class-validator";

export class QuotationController {

    static async createQuotation(req: Request, res: Response) {

        let idEvent;

        const {description, provider, expected_expense} = req.body;

        const event = await eventRepository.findOneOrFail({where:{id:idEvent}});//confirmar qual id buscar para criar o quotation

        if(!event){
            return res.status(404).json({message:"Event not found."});
        }

        const newQuotation = quotationRepository.create({
            description,
            provider,
            expected_expense,
            actual_expense: 0,
            amount_already_paid: 0,
        })
        
        await quotationRepository.save(newQuotation);

        return res.status(201).send("Quotation created.")

    }


}