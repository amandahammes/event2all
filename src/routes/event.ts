import { checkJwt } from "./../middlewares/checkJwt";
import { EventController } from "./../controllers/EventController";
import { Router } from "express";

const router = Router();

router
  .route("/event")
  .put([checkJwt], EventController.putAddUserinEvent)
  .get([checkJwt], EventController.getAllEvents);

router.get("/event/:idUser([0-9]+)", [checkJwt], EventController.getEventbyIdUser);


router
  .route("/event").post([checkJwt], EventController.createEventbyUser)

router
  .route("/event/:id([0-9]+)")
  .put([checkJwt],EventController.editEvent)
  .delete([checkJwt],EventController.deleteEvent);

router.get("/event/allExpectedExpense/:id([0-9]+)", [checkJwt], EventController.listAllExpected_Expense);
router.get("/event/allActualExpense/:id([0-9]+)",[checkJwt],EventController.listAllExpense);

export default router;