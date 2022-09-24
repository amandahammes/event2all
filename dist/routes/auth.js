"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../controllers/AuthController");
const express_1 = require("express");
// import {checkJwt} from "../middlewares/checkJwt";
const router = (0, express_1.Router)();
router.post("/login", AuthController_1.AuthController.auth);
router.put("/change-password", AuthController_1.AuthController.changePassword);
exports.default = router;
