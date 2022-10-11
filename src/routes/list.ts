import { ListController } from "../controllers/ToDoListController";
import { Router } from "express";
import { checkJwt } from "./../middlewares/checkJwt";

const router = Router();

router.post("/content", [checkJwt], ListController.createList);
router.get("/content/event/:event_id([0-9]+)",[checkJwt],ListController.getAllListByEventId);

router
  .route("/content/:id([0-9]+)")
  .put([checkJwt], ListController.editList)
  .delete([checkJwt], ListController.deleteList);
export default router;