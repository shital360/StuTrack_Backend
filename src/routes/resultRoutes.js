import express from "express";
import { viewMyResult, uploadResult } from "../controllers/resultController.js";
import { protect } from "../middlewares/auth.js";
import { resultUploader } from "../middlewares/upload.js";

const router = express.Router();

router.get("/my-result", protect, viewMyResult);
router.post("/upload", resultUploader.single("result"), uploadResult);

export default router;
