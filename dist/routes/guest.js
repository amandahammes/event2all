"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuestController_1 = require("../controllers/GuestController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/guest", GuestController_1.GuestController.createGuest);
router.get("/guest/event/:event_id([0-9]+)", GuestController_1.GuestController.getAllGuestByEventId);
router
    .route("/guest/:id([0-9]+)")
    .put(GuestController_1.GuestController.editGuest)
    .delete(GuestController_1.GuestController.deleteGuest);
exports.default = router;
