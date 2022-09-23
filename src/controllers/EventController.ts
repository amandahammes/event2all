import { userRepository } from './../repositories/userRepository';
import { eventRepository } from '../repositories/eventRepository';
import { Event } from "./../entities/Event";
import { User } from '../entities/User';
import { Response, Request } from "express";
import { validate } from "class-validator";
import { EntityNotFoundError } from "typeorm";

export class EventController {

  static async createEvent(req: Request, res: Response) {
    let {event_id, place, name, date} = req.body; //Ver se é event_id ou user_id
    
    date = new Date(date).toISOString();

    let user: User;
    console.log(date);
    
    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(event_id)},
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).send("User not found");
      }
        return res.status(500).json(error);
    }

    const newEvent = eventRepository.create({
      place,
      name,
      date,
      user_id: user,
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
    const { idUser } = req.params;
    let user: User;

    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(idUser)},
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).send("User not found");
      }
      return res.status(500).json(error);
    }

    let allEventsbyUser: Array<Event>;
    try {
      allEventsbyUser = await eventRepository.find({
        where: { user_id: {id: Number(idUser)}}
      });
    } catch (error) {
      return res.status(500).json(error);
    }
    
    return res.send(allEventsbyUser)
  }

  static async editUser(req: Request, res: Response) {
    const id = req.params.id;

    let { place, name, date } = req.body;

    date = new Date(date).toISOString();

    let event: Event;
    try {
      event = await eventRepository.findOneOrFail({
        where: { id: Number(id)}
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).send("User not found");
      }
      return res.status(500).json(error);
    }

    if (place) {
      event.place = place
    }
    if (name) {
      event.name = name
    }
    if (date) {
      event.date = date
    }

    const errors = await validate(event);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      await eventRepository.save(event);
    } catch (error) {
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async deleteEvent(req: Request, res: Response) {
    const id = req.params.id;
    let event: Event;
    try {
      event = await eventRepository.findOneOrFail({
        where: { id: Number(id)}
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).send("User not found");
      }
      return res.status(500).json(error);
    }

    try {
      eventRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async listAllExpected_Expense(req: Request, res: Response) {
    
  }

  static async listAllExpense(req: Request, res: Response) {
    
  }
}
