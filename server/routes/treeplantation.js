import express from "express";
import {
  getTreeEvents,
  getTreeEvent,
  addTreeEvent,
  deleteTreeEvent,
  updateTreeEvent,
} from "../controllers/tree_plantation_event.js";

const router = express.Router();

router.get("/gets", getTreeEvents);
router.get("/get/:", getTreeEvent);
router.post("/add", addTreeEvent);
router.delete("/delete/:id", deleteTreeEvent);
router.put("/update/:id", updateTreeEvent);

export default router;
