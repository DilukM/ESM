import express from "express";
import {
  getUser,
  getDashboardStats,
  
  getDonors,
  getDonor,
  addDonor,
  deleteDonors,

  addCurrentItem,
  getCurrentItems,
  getCurrentItem,
  deleteCurrentItems,

  addReleaseItem,
  getReleaseItems,
  getReleaseItem,
  deleteReleaseItems,

} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/donors", getDonors);
router.get("/donors", getDonor);
router.post("/donors", addDonor);
router.delete("/donors/:id", deleteDonors);
router.get("/dashboard", getDashboardStats);

router.get("/currentItems", getCurrentItems);
router.get("/currentItems", getCurrentItem);
router.get("/currentItems", addCurrentItem);
router.get("/currentItems/:id", deleteCurrentItems);

router.get("/releaseItems", getReleaseItems);
router.get("/releaseItems", getReleaseItem);
router.get("/releaseItems", addReleaseItem);
router.get("/releaseItems/:id", deleteReleaseItems);

export default router;
