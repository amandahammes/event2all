import { userRepository } from "./../repositories/userRepository";
import { eventRepository } from "../repositories/eventRepository";
import { quotationRepository } from "../repositories/quotationRepository";
import { Event } from "./../entities/Event";
import { User } from "../entities/User";
import { Response, Request } from "express";
import { validate } from "class-validator";
import { EntityNotFoundError } from "typeorm";
import jwt from "jsonwebtoken";

export class EventController {
  static async createEventbyUser(req: Request, res: Response) {
    const token = <any>req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Not logged.");
    }

    let payload;

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET ?? "");
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }

    const { id }: any = payload;

    let { place, name, date, managers, event_budget, invite_number } = req.body;

    if (Array.isArray(managers) != true) {
      return res.status(404).send("Invalid type of parameters on request!");
    }

    let loggedUser = await userRepository.findOne({ where: { id } });

    managers.push(loggedUser?.email);

    let new_date;
    try {
      let splitDate = date.split("/");
      splitDate.reverse().join("/");
      new_date = new Date(splitDate);
    } catch (error) {
      return res.status(400).send("Invalid Date Format");
    }

    const users = await Promise.all(
      managers.map((manager: string) => {
        const user = userRepository.findOne({ where: { email: manager } });

        if (!user) return null;

        return user;
      })
    );

    const usersExists = users.findIndex((element) => element == null);

    if (usersExists >= 0) return res.status(404).send("User not found");

    try {
      const newEvent = eventRepository.create({
        place,
        name,
        date: new_date,
        users,
        event_budget,
        invite_number,
      });

      await eventRepository.save(newEvent);

      return res.status(201).json(newEvent);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async putAddUserinEvent(req: Request, res: Response) {
    let { user_id, event_id } = req.body;

    try {
      let user = await userRepository.findOneBy({ id: Number(user_id) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let event = await eventRepository.find({ relations: { users: true } });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (user) {
        event[-1 + event_id].users.push(user);
      }

      try {
        await eventRepository.save(event);
        return res.status(201).send(event[-1 + event_id]);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getAllEvents(req: Request, res: Response) {
    let allEvents: Array<Event> = [];
    try {
      allEvents = await eventRepository.find();
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
        where: { id: Number(idUser) },
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
        where: { users: { id: Number(idUser) } },
      });
    } catch (error) {
      return res.status(500).json(error);
    }

    return res.send(allEventsbyUser);
  }

  static async editEvent(req: Request, res: Response) {
    const id = req.params.id;

    let { place, name, date, event_budget, invite_number } = req.body;

    let new_date;
    try {
      let splitDate = date.split("/");
      splitDate.reverse().join("/");
      new_date = new Date(splitDate);
    } catch (error) {
      return res.status(400).send("Invalid Date Format");
    }

    let event: Event;
    try {
      event = await eventRepository.findOneOrFail({
        where: { id: Number(id) },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).send("User not found");
      }
      return res.status(500).json(error);
    }

    if (place) {
      event.place = place;
    }
    if (name) {
      event.name = name;
    }
    if (date) {
      event.date = new_date;
    }
    if (event_budget) {
      console.log(event_budget);
      event.event_budget = event_budget;
    }
    if (invite_number) {
      event.invite_number = invite_number;
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
        where: { id: Number(id) },
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
    let id = req.params.id;

    let quotation: any;

    try {
      quotation = await quotationRepository
        .createQueryBuilder("quotation")
        .where("quotation.event_id = :event_id", { event_id: id })
        .addSelect("SUM(quotation.expected_expense)", "sum")
        .groupBy("quotation.event_id")
        .getRawOne();
    } catch (error) {
      return res.status(400).send(error);
    }

    try {
      const { quotation_event_id, sum } = quotation;

      let expected_sum_event = {
        event_id: quotation_event_id,
        expected_expense: sum,
      };
      return res.json(expected_sum_event);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async listAllExpense(req: Request, res: Response) {
    const id = req.params.id;

    let quotation: any;

    try {
      quotation = await quotationRepository
        .createQueryBuilder("quotation")
        .where("quotation.event_id=:event_id", { event_id: id })
        .addSelect("SUM(quotation.actual_expense)", "sum")
        .groupBy("quotation.event_id")
        .getRawOne();
    } catch (error) {
      return res.status(400).send(error);
    }

    try {
      const { quotation_event_id, sum } = quotation;

      let actual_sum_event = {
        event_id: quotation_event_id,
        actual_expense: sum,
      };
      return res.json(actual_sum_event);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async getEventbyIdUserandbyIdEvent(req: Request, res: Response) {
    const token = <any>req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Not logged.");
    }

    let payload;

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET ?? "");
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }
      return res.status(400).end();
    }

    const { id }: any = payload;

    const idEvent = req.params.idEvent;
    let user: User;

    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(id)},
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
        where: { id: Number(idEvent), users: {id: Number(id)}}
      });
      

    } catch (error) {
      return res.status(500).json(error);
    }
    
    return res.send(allEventsbyUser)
  }
}
