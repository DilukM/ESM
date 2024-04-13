import express from "express";
import {
  getItems,
  getItem,
  addItem,
  deleteItems,
  updateItems,
  
} from "../controllers/items.js";

const router = express.Router();

router.get("/gets", getItems);
router.get("/get/:id", getItem);
router.post("/add", addItem);
router.delete("/delete/:id", deleteItems);
router.put("/update/:id", updateItems);


export default router;
