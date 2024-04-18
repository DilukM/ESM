import express from "express";
import {
  getdEvents,
  getdEvent,
  addDEvent,
  deletedEvent,
  updatedEvent,
} from "../controllers/donor_event_controller.js";

const router = express.Router();

router.get("/gets", getdEvents);
router.get("/get/:id", getdEvent);
router.post("/add", addDEvent);
router.delete("/delete/:id", deletedEvent);
router.put("/update/:id", updatedEvent);

export default router;
