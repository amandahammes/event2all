import { QuotationController } from "./../controllers/QuotationController";
import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.route("/quotation").post(QuotationController.createQuotation);

router
  .route("/quotation/:id([0-9]+)")
  .get([checkJwt],QuotationController.getQuotationById)
  .put([checkJwt],QuotationController.editQuotation)
  .delete([checkJwt],QuotationController.deleteQuotation);

router
  .route("/quotation/event/:id([0-9]+)")
  .get([checkJwt],QuotationController.getAllQuotationByEventId);

export default router;
