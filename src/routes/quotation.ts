import { QuotationController } from './../controllers/QuotationController';
import { Router } from "express";

const router = Router();

router.post("/quotation", QuotationController.createQuotation)



export default router;
