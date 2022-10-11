import { listRepository } from '../repositories/listRepository';
import { eventRepository } from '../repositories/eventRepository';
import { Response, Request } from "express"
import { validate } from "class-validator"

export class ListController {
    static async createList (req: Request, res: Response) {
        const { id, content, done, event_id } = req.body
        const event = await eventRepository.findOneBy({id: event_id})

        if(!event) return res.status(404).json({error: "Event not found"})

        const newList = listRepository.create({ content, done, event })
        
        const errors = await validate(newList)
        
        if(errors.length > 0) return res.status(400).send(errors)
        
        await listRepository.save(newList)
        
        return res.status(201).json({message: "Content Created", newList})
    }

    static async editList (req: Request, res: Response){
        const { content } = req.body
        const { id } = req.params
        const list = await listRepository.findOneBy({id: Number(id)})

        if(!list) return res.status(404).json({error: "Content not found"})

        if(content) list.content = content

        const errors = await validate(list)

        if(errors.length > 0) return res.status(400).send(errors)

        await listRepository.save(list)

        return res.status(201).json({message: "List Updated"})

    }

    static async deleteList (req: Request, res: Response){
        const { id } = req.params

        const listExists = await listRepository.countBy({id: Number(id)})

        if(listExists < 1) return res.status(404).json({error: "Content not found"})

        await listRepository.delete(id)

        return res.sendStatus(204)
    }

    static async getAllListByEventId (req: Request, res: Response){
        const { event_id } = req.params

        const eventExists = await eventRepository.countBy({id: Number(event_id)})

        if(eventExists < 1) return res.status(404).json({error: "Event not found"})

        const listEvent = await listRepository.find({
            where: {
                event: {
                    id: Number(event_id)
                }
            }
        })

        return res.status(200).send(listEvent)

    }

}