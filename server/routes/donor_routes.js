import express from "express";
import {
  getDonors,
  getDonor,
  addDonor,
  deleteDonors,
  updateDonors,
} from "../controllers/donor_controller.js";

const router = express.Router();

router.get("/gets", getDonors);
router.get("/get", getDonor);
router.post("/add", addDonor);
router.delete("/delete/:id", deleteDonors);
router.put("/update/:id", updateDonors);

export default router;
