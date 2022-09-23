import { eventRepository } from '../repositories/eventRepository';
import { Event } from "./../entities/Event";
import { Response, Request } from "express";
import { validate } from "class-validator";
import { EntityNotFoundError } from "typeorm";

export class EventController {

  static async createEvent(req: Request, res: Response) {
    const {idUser, place, name, date} = req.body;

    let event: Event
    const newEvent = eventRepository.create({
      idUser,
      place,
      name,
      date,
    });
    const errors = await validate(newEvent);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      await eventRepository.save(newEvent);
    } catch (error) {
      return res.status(500).json(error);
    }
    return res.status(201).json(newEvent);
  }

  static async getAllEvents(req: Request, res: Response) {
    let allEvents: Array<Event> = [];
    try {
      allEvents = await eventRepository.find()
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).send(allEvents);
  }

  static async getEventbyIdUser(req: Request, res: Response) {
    const idUser = req.params.idUser;
    let event: Event;

    try {
      event = await eventRepository.findOneOrFail({
        where: { id: Number(idUser)},
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).send("User not found");
      }
      return res.status(500).json(error);
    }

    return res.send(event)
  }

  // static async editUser(req: Request, res: Response)
}
