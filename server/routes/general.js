import express from "express";
import {
  getUser,
  getDashboardStats,
  getDonors,
  deleteDonors,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/donors", getDonors);
router.delete("/dltdonors/:id", deleteDonors);
router.get("/dashboard", getDashboardStats);

export default router;
