"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuotationController_1 = require("./../controllers/QuotationController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/quotation").post(QuotationController_1.QuotationController.createQuotation);
router
    .route("/quotation/:id([0-9]+)")
    .get(QuotationController_1.QuotationController.getQuotationById)
    .put(QuotationController_1.QuotationController.editQuotation)
    .delete(QuotationController_1.QuotationController.deleteQuotation);
router
    .route("/quotation/event/:id([0-9]+)")
    .get(QuotationController_1.QuotationController.getAllQuotationByEventId);
exports.default = router;
