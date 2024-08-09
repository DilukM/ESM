import express from "express";
import {
  getItems_in,
  getItem_in,
  addItem_in,
  deleteItems_in,
  updateItems_in,
} from "../controllers/items_in_controller.js";

const router = express.Router();

router.get("/gets", getItems_in);
router.get("/get/:id", getItem_in);
router.post("/add", addItem_in);
router.delete("/delete/:id", deleteItems_in);
router.put("/update/:id", updateItems_in);

export default router;
