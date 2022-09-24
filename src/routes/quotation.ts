import { QuotationController } from "./../controllers/QuotationController";
import { Router } from "express";

const router = Router();

router.route("/quotation").post(QuotationController.createQuotation);

router
  .route("/quotation/:id([0-9]+")
  .get(QuotationController.getQuotationById)
  .put(QuotationController.editQuotation)
  .delete(QuotationController.deleteQuotation);

router
  .route("/quotation/event/:id([0-9]+)")
  .get(QuotationController.getAllQuotationByEventId);

export default router;
