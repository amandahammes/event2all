import { eventRepository } from '../repositories/eventRepository';
import { Event } from "./../entities/Event";
import { Response, Request } from "express";
import { validate } from "class-validator";
import { EntityNotFoundError } from "typeorm";

export class EventController {

  static async createEvent(req: Request, res: Response) {
    const {place, name, date} = req.body;

    let event: Event
    const newEvent = eventRepository.create({
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

}
