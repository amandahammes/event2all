"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventController_1 = require("./../controllers/EventController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/event", EventController_1.EventController.createEvent); //Ok
router.get("/event", EventController_1.EventController.getAllEvents); //Ok
router.get("/event/:idUser([0-9]+)", EventController_1.EventController.getEventbyIdUser); //Ok
router.put("/event/:id([0-9]+)", EventController_1.EventController.editUser); //Ok
router.delete("/event/:id([0-9]+)", EventController_1.EventController.deleteEvent); //Ok
router.get("/event/allExpectedExpense/:id([0-9]+)", EventController_1.EventController.listAllExpected_Expense);
router.get("/event/allActualExpense/:id([0-9]+)", EventController_1.EventController.listAllExpense);
exports.default = router;
