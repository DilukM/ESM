import express from "express";
import {
  getItems_out,
  getItem_out,
  addItem_out,
  deleteItems_out,
  updateItems_out,
  
} from "../controllers/items_out.js";

const router = express.Router();

router.get("/gets", getItems_out);
router.get("/get/:id", getItem_out);
router.post("/add", addItem_out);
router.delete("/delete/:id", deleteItems_out);
router.put("/update/:id", updateItems_out);


export default router;
