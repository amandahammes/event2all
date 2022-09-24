import { QuotationController } from './../controllers/QuotationController';
import { Router } from "express";

const router = Router();

router.post("/quotation", QuotationController.createQuotation);
router.get("/quotation/:id([0-9]+)", QuotationController.getQuotationById);
router.get("/quotation/event/:id([0-9]+)", QuotationController.getAllQuotationByEventId);
router.put("/quotation/:id([0-9]+)", QuotationController.editQuotation);
router.delete("/quotation/:id([0-9]+)", QuotationController.deleteQuotation);


export default router;
