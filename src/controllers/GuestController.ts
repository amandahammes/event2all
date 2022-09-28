import { eventRepository } from '../repositories/eventRepository'
import { guestRepository } from '../repositories/guestRepository'
import { Response, Request } from "express"
import { validate } from "class-validator"

export class GuestController {
    static async createGuest(req: Request, res: Response) {
        const { name, email, phone, birth_date, event_id } = req.body

        const event = await eventRepository.findOneBy({id: event_id})

        if(!event) return res.status(404).json({error: "Event not found"})

        const newGuest = guestRepository.create({
            name,
            email,
            phone,
            birth_date,
            event
        })

        const errors = await validate(newGuest)

        if(errors.length > 0) return res.status(400).send(errors)

        await guestRepository.save(newGuest)

        return res.status(201).json({message: "Guest Created"})
    }

    static async getAllGuestByEventId(req: Request, res: Response) {
        const { event_id } = req.params

        const eventExists = await eventRepository.countBy({id: Number(event_id)})

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
        const { name, email, phone, birth_date } = req.body
        const { id } = req.params

        const guest = await guestRepository.findOneBy({id: Number(id)}) 

        if(!guest) return res.status(404).json({error: "Guest not found"})

        if(name) guest.name = name
        if(email) guest.email = email
        if(phone) guest.phone = phone
        if(birth_date) guest.birth_date = birth_date

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