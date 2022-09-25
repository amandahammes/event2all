import { checkToken } from "./../middlewares/checkToken";
import { checkJwt } from "./../middlewares/checkJwt";
import { EventController } from "./../controllers/EventController";
import { Router } from "express";

const router = Router();

router
  .route("/event")
  .post([checkToken], [checkJwt], EventController.createEvent) //Ok
  .get(EventController.getAllEvents); //Ok

router.get("/event/:idUser([0-9]+)", EventController.getEventbyIdUser); //Ok

router
  .route("/event/:id([0-9]+)")
  .put(EventController.editUser) //Ok
  .delete(EventController.deleteEvent); //Ok

router.get(
  "/event/allExpectedExpense/:id([0-9]+)",
  EventController.listAllExpected_Expense
);
router.get(
  "/event/allActualExpense/:id([0-9]+)",
  EventController.listAllExpense
);

export default router;
