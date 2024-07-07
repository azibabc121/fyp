import express from "express";
import {
  createPhotographer,
  getAllPhotographers,
  getSinglePhotographer,
  deleteSinglePhotographer,
  updateSinglePhotographer,
  uploadPhotographerPortfolio,
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
router.post(
  "/portfolio/:id",
  upload.fields([
    {
      name: "portfolio",
      maxCount: 5,
    },
  ]),
  uploadPhotographerPortfolio
);

export default router;
