import multer from "multer";
import express from "express";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.route("/").post(upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded...");
  } catch (error) {
    console.log(error);
  }
});

export default router;
