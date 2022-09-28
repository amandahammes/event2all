"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkToken_1 = require("./../middlewares/checkToken");
const checkJwt_1 = require("./../middlewares/checkJwt");
const EventController_1 = require("./../controllers/EventController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route("/event")
    .post([checkToken_1.checkToken], [checkJwt_1.checkJwt], EventController_1.EventController.createEvent) //Ok
    .get(EventController_1.EventController.getAllEvents); //Ok
router.get("/event/:idUser([0-9]+)", EventController_1.EventController.getEventbyIdUser); //Ok
router
    .route("/event/:id([0-9]+)")
    .put(EventController_1.EventController.editUser) //Ok
    .delete(EventController_1.EventController.deleteEvent); //Ok
router.get("/event/allExpectedExpense/:id([0-9]+)", EventController_1.EventController.listAllExpected_Expense);
router.get("/event/allActualExpense/:id([0-9]+)", EventController_1.EventController.listAllExpense);
exports.default = router;
