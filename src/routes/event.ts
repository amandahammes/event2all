import { checkJwt } from "./../middlewares/checkJwt";
import { EventController } from "./../controllers/EventController";
import { Router } from "express";

const router = Router();

router
  .route("/event")
  .post([checkJwt], EventController.createEvent) //Ok
  .get([checkJwt],EventController.getAllEvents); //Ok

router.get("/event/:idUser([0-9]+)", [checkJwt], EventController.getEventbyIdUser); //Ok

router
  .route("/event/:id([0-9]+)")
  .put([checkJwt],EventController.editUser) //Ok
  .delete([checkJwt],EventController.deleteEvent); //Ok

router.get("/event/allExpectedExpense/:id([0-9]+)", [checkJwt], EventController.listAllExpected_Expense);
router.get("/event/allActualExpense/:id([0-9]+)",[checkJwt],EventController.listAllExpense);

export default router;
