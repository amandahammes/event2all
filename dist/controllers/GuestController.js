"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestController = void 0;
const eventRepository_1 = require("../repositories/eventRepository");
const guestRepository_1 = require("../repositories/guestRepository");
const class_validator_1 = require("class-validator");
class GuestController {
    static async createGuest(req, res) {
        const { name, email, phone, event_id } = req.body;
        const event = await eventRepository_1.eventRepository.findOneBy({ id: event_id });
        if (!event)
            return res.status(404).json({ error: "Event not found" });
        const newGuest = guestRepository_1.guestRepository.create({
            name,
            email,
            phone,
            event
        });
        const errors = await (0, class_validator_1.validate)(newGuest);
        if (errors.length > 0)
            return res.status(400).send(errors);
        await guestRepository_1.guestRepository.save(newGuest);
        return res.status(201).json({ message: "Guest Created" });
    }
    static async getAllGuestByEventId(req, res) {
        const { event_id } = req.params;
        const eventExists = await eventRepository_1.eventRepository.countBy({ id: Number(event_id) });
        if (eventExists < 1)
            return res.status(404).json({ error: "Event not found" });
        const guestsEvent = await guestRepository_1.guestRepository.find({
            where: {
                event: {
                    id: Number(event_id)
                }
            }
        });
        return res.status(200).send(guestsEvent);
    }
    static async editGuest(req, res) {
        const { name, email, phone } = req.body;
        const { id } = req.params;
        const guest = await guestRepository_1.guestRepository.findOneBy({ id: Number(id) });
        if (!guest)
            return res.status(404).json({ error: "Guest not found" });
        if (name)
            guest.name = name;
        if (email)
            guest.email = email;
        if (phone)
            guest.phone = phone;
        const errors = await (0, class_validator_1.validate)(guest);
        if (errors.length > 0)
            return res.status(400).send(errors);
        await guestRepository_1.guestRepository.save(guest);
        return res.status(201).json({ message: "Guest Updated" });
    }
    static async deleteGuest(req, res) {
        const { id } = req.params;
        const guestExists = await guestRepository_1.guestRepository.countBy({ id: Number(id) });
        if (guestExists < 1)
            return res.status(404).json({ error: "Guest not found" });
        await guestRepository_1.guestRepository.delete(id);
        return res.sendStatus(204);
    }
}
exports.GuestController = GuestController;
