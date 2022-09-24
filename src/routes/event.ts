import { EventController } from './../controllers/EventController';
import { Router } from "express";

const router = Router();

router.post("/event", EventController.createEvent) //Ok
router.get("/event", EventController.getAllEvents) //Ok
router.get("/event/:idUser([0-9]+)", EventController.getEventbyIdUser) //Ok
router.put("/event/:id([0-9]+)", EventController.editUser) //Ok
router.delete("/event/:id([0-9]+)", EventController.deleteEvent) //Ok

router.get("/event/allExpectedExpense/:id([0-9]+)", EventController.listAllExpected_Expense)
// router.get("/event/allExpense", EventController.listAllExpense)

export default router;
