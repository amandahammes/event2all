import { UserController } from "./../controllers/UserController";
import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkToken } from "../middlewares/checkToken";
const router = Router();

router
  .route("/user")
  .post(UserController.createUser)
  .get([checkToken], [checkJwt], UserController.listAll);
router
  .route("/user/:id([0-9]+)")
  .get(UserController.getOneById)
  .delete([checkToken], [checkJwt], UserController.deleteUser)
  .put([checkToken], [checkJwt], UserController.editUser);

export default router;
