import multer from "multer";
import path from "path";
import fs from "fs";

const BASE_UPLOAD_DIR = path.resolve("./uploads");

// reusable function
function createMulterUploader(folderName) {
  const uploadPath = path.join(BASE_UPLOAD_DIR, folderName);

  // create folder if not exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });

  return multer({ storage });
}

// exporters for Student Information Management System
export const studentPhotoUploader = createMulterUploader("studentPhotos");
export const studentDocumentUploader = createMulterUploader("studentDocuments");
export const assignmentUploader = createMulterUploader("assignments");
