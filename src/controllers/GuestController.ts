import { eventRepository } from '../repositories/eventRepository'
import { guestRepository } from '../repositories/guestRepository'
import { Response, Request } from "express"
import { validate } from "class-validator"

export class GuestController {
    static async createGuest(req: Request, res: Response) {
        const { name, contact, invite, isConfirmed } = req.body
        const { event_id } = req.params

        const event = await eventRepository.findOneBy({id: Number(event_id), deleted: false})

        if(!event) return res.status(404).json({error: "Event not found"})

        const newGuest = guestRepository.create({
            name,
            contact: "",
            invite: false,
            isConfirmed: "",
            event: event
        })

        const errors = await validate(newGuest)

        if(errors.length > 0) return res.status(400).send(errors)

        await guestRepository.save(newGuest)

        return res.status(201).json({message: "Guest Created"})
    }

    static async getAllGuestByEventId(req: Request, res: Response) {
        const { event_id } = req.params

        const eventExists = await eventRepository.countBy({id: Number(event_id), deleted: false})

        if(eventExists < 1) return res.status(404).json({error: "Event not found"})

        const guestsEvent = await guestRepository.find({
            where: {
                event: {
                    id: Number(event_id)
                }
            }
        })

        return res.status(200).send(guestsEvent)
    }

    static async editGuest(req: Request, res: Response) {
        const { name, contact, invite, isConfirmed} = req.body
        const { id } = req.params

        const guest = await guestRepository.findOneBy({id: Number(id)}) 

        if(!guest) return res.status(404).json({error: "Guest not found"})

        if(name) guest.name = name
        if(contact) guest.contact = contact
        if(invite) guest.invite = invite
        if(isConfirmed) guest.isConfirmed = isConfirmed

        const errors = await validate(guest)

        if(errors.length > 0) return res.status(400).send(errors)

        await guestRepository.save(guest)

        return res.status(201).json({message: "Guest Updated"})
    }

    static async deleteGuest(req: Request, res: Response) {
        const { id } = req.params

        const guestExists = await guestRepository.countBy({id: Number(id)}) 

        if(guestExists < 1) return res.status(404).json({error: "Guest not found"})

        await guestRepository.delete(id)

        return res.sendStatus(204)
    }
}