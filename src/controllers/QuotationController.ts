import { eventRepository } from '../repositories/eventRepository';
import { quotationRepository } from '../repositories/quotationRepository';
import { Quotation } from "./../entities/Quotation";
import { Response, Request } from "express";
import { validate } from "class-validator";

export class QuotationController {

    static async createQuotation(req: Request, res: Response) {

        const {event_id,description, provider, expected_expense} = req.body;

        let event;
        try {
            event = await eventRepository.findOneOrFail({where:{id:event_id}});
        } catch (error) {
            return res.status(404).send("Event Not Found");
        }

        const newQuotation = quotationRepository.create({
            event_id,
            description,
            provider,
            expected_expense,
            actual_expense: 0,
            amount_already_paid: 0,
        })
        
        await quotationRepository.save(newQuotation);

        return res.status(201).send("Quotation created.")

    };

    static async getQuotationById(req:Request, res:Response){
        let id_quotation = req.params.id;

        let quotation;

        try {
          quotation = await quotationRepository.findOneOrFail({where:{id : Number(id_quotation)}})  
        } catch (error) {
            return res.status(404).send("Quotation does not exist.")
        };
        
        return res.status(200).send(quotation);
    };

    static async editQuotation(req:Request, res:Response) {
        let id_quotation = req.params.id;

        const {description, provider, expected_expense, actual_expense, amount_already_paid} = req.body;

        let quotation: Quotation;

        try{
            quotation = await quotationRepository.findOneOrFail({where:{id : Number(id_quotation)}});
        }catch(error){
            return res.status(404).send("Id not Found!");
        };

        if(description){
            quotation.description = description;
        };

        if(provider){
            quotation.provider = provider;
        };

        if(expected_expense){
            quotation.expected_expense = expected_expense;
        };

        if(actual_expense){
            quotation.actual_expense = actual_expense;
        };

        if(amount_already_paid){
            quotation.amount_already_paid = amount_already_paid;
        };

        const validation = await validate(quotation);
        if(validation.length > 0){
            return res.status(400).send(validation);
        };

        try {
            await quotationRepository.save(quotation);
        } catch (error) {
            return res.status(400).send(error);
            
        };

        return res.status(200).send("Quotation updated");
    
    };

    static async getAllQuotationByEventId (req:Request, res:Response){
        const event_id = req.params.id;
        let quotation_id = req.params; 

        let event; 
        try {
            event = await eventRepository.findOneOrFail({where:{id : Number(event_id)}});
        } catch (error) {
            return res.status(404).send("Event Not Found");
        }

        let quotation : any;

        try {
            quotation = await quotationRepository.find({
                where:{
                    event_id:quotation_id
                }
            });

            return res.status(200).send(quotation);
        } catch (error) {
            return res.status(404).send(error);
        }

    }

    static async deleteQuotation (req:Request, res:Response){
        let id_quotation = req.params.id;

        let quotation: Quotation;

        try{
            quotation = await quotationRepository.findOneOrFail({where:{id : Number(id_quotation)}});
        }catch(error){
            return res.status(404).send("Id not Found!");
        }

        quotationRepository.delete(id_quotation);

        return res.status(204).send();
    }


}