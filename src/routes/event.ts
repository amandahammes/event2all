import { EventController } from './../controllers/EventController';
import { Router } from "express";

const router = Router();

router.post("/event", EventController.createEvent)

export default router;
