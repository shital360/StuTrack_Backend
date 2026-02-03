import express from "express";
import {
  getAllStudents,
  getStudentById,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);

export default router;
