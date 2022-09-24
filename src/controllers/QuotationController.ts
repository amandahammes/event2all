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
        let idQuotation: any = req.params;

        let quotation;

        try {
          quotation = await quotationRepository.findOneOrFail({where:{id:idQuotation}})  
            return res.send(200).send(quotation);
        } catch (error) {
            return res.send(404).send("Quotation does not exist.")
        };
        
        
    };

    static async editQuotation(req:Request, res:Response) {
        let idQuotation:any = req.params;

        const {description, provider, expected_expense, actual_expense, amount_already_paid} = req.body;

        let quotation: Quotation;

        try{
            quotation = await quotationRepository.findOneOrFail({where:{id:idQuotation}});
        }catch(error){
            return res.status(404).send("Id not Found!");
        }

        try {
            quotation.description = description;
            quotation.provider = provider;
            quotation.expected_expense = expected_expense;
            quotation.actual_expense = actual_expense;
            quotation.amount_already_paid = amount_already_paid;

        } catch (error) {
            res.status(400).send("No valid body sent.")            
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
        const event_id:any = req.params;
        
        let event; 
        try {
            event = await eventRepository.findOneOrFail({where:{id:event_id}});
        } catch (error) {
            return res.status(404).send("Event Not Found");
        }

        let quotation : any;

        try {
            quotation = await quotationRepository.find({
                where:{
                    event_id:event_id
                }
            });

            return res.status(200).send(quotation);
        } catch (error) {
            return res.status(404).send(error);
        }

    }

    static async deleteQuotation (req:Request, res:Response){
        let idQuotation:any = req.params;

        let quotation: Quotation;

        try{
            quotation = await quotationRepository.findOneOrFail({where:{id:idQuotation}});
        }catch(error){
            return res.status(404).send("Id not Found!");
        }


        quotationRepository.delete(idQuotation);

        return res.status(204).send();
    }


}