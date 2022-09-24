import { GuestController } from '../controllers/GuestController'
import { Router } from "express"

const router = Router()

router.post("/guest", GuestController.createGuest)
router.get("/guest/event/:event_id([0-9]+)", GuestController.getAllGuestByEventId)
router.put("/guest/:id([0-9]+)", GuestController.editGuest)
router.delete("/guest/:id([0-9]+)", GuestController.deleteGuest)

export default router