import express from "express";
import {
  getDonors,
  getDonor,
  addDonor,
  deleteDonors,
  updateDonors,
  donorLogin,
  getLeaderboard,
  resetPassword,
} from "../controllers/donor_controller.js";

const router = express.Router();

router.get("/gets", getDonors);
router.get("/leaderboard", getLeaderboard);
router.get("/get/:id", getDonor);
router.post("/add", addDonor);
router.delete("/delete/:id", deleteDonors);
router.put("/update/:id", updateDonors);
router.post("/login", donorLogin);
router.put("/reset/:id", resetPassword);

export default router;
