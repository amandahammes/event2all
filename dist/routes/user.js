"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./../controllers/UserController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route("/user")
    .post(UserController_1.UserController.createUser)
    .get(UserController_1.UserController.listAll);
router
    .route("/user/:id([0-9]+)")
    .get(UserController_1.UserController.getOneById)
    .delete(UserController_1.UserController.deleteUser)
    .put(UserController_1.UserController.editUser);
exports.default = router;
