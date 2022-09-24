import { UserController } from "./../controllers/UserController";
import { Router } from "express";
const router = Router();

router
  .route("/user")
  .post(UserController.createUser)
  .get(UserController.listAll);
router
  .route("/user/:id([0-9]+)")
  .get(UserController.getOneById)
  .delete(UserController.deleteUser)
  .put(UserController.editUser);

export default router;
