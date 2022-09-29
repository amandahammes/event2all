import { UserController } from "./../controllers/UserController";
import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
const router = Router();

router
  .route("/user")
  .post(UserController.createUser)
  .get([checkJwt],UserController.listAll);
router
  .route("/user/:id([0-9]+)")
  .get([checkJwt],UserController.getOneById)
  .delete([checkJwt],UserController.deleteUser)
  .put([checkJwt],UserController.editUser);

export default router;
