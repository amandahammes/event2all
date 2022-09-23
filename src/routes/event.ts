import { EventController } from './../controllers/EventController';
import { Router } from "express";

const router = Router();

router.post("/event", EventController.createEvent)
router.get("/event", EventController.getAllEvents)
router.get("/event/:idUser([0-9]+)", EventController.getEventbyIdUser)
router.put("/event", )
router.delete("/event", )

router.get("/event/allexpected_expense", )
router.get("/event/allexpense", )

export default router;
