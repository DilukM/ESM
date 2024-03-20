import express from "express";
import {
  getDonors,
  getDonor,
  addDonor,
  deleteDonors,
  updateDonors,
} from "../controllers/donor_controller.js";

const router = express.Router();

router.get("/donors", getDonors);
router.get("/donors", getDonor);
router.post("/donors/add", addDonor);
router.delete("/donors/:id", deleteDonors);
router.put("/donors/update", updateDonors);

export default router;
