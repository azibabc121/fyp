import express from "express";
import {
  createPhotographer,
  getAllPhotographers,
  getSinglePhotographer,
  deleteSinglePhotographer,
  updateSinglePhotographer,
} from "../controllers/photographer.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  createPhotographer
);
router.get("/all", getAllPhotographers);
router.get("/:id", getSinglePhotographer);
router.delete("/:id", deleteSinglePhotographer);
router.put("/:id", updateSinglePhotographer);

export default router;
