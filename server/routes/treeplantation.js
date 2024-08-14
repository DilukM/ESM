import express from "express";
import multer from 'multer';
import {
  getTreeEvents,
  getTreeEvent,
  addTreeEvent,
  deleteTreeEvent,
  updateTreeEvent,
  getLastEvent,
} from "../controllers/tree_plantation_event.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/gets", getTreeEvents);
router.get("/get/:id", getTreeEvent);
router.post("/add", upload.single('coverImage'), addTreeEvent); // Handle image upload
router.delete("/delete/:id", deleteTreeEvent);
router.put("/update/:id", upload.single('coverImage'), updateTreeEvent); // Handle image update
router.get("/last",getLastEvent);

export default router;
