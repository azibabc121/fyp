import express from "express";
import {
  createPhotographer,
  getAllPhotographers,
  getSinglePhotographer,
  deleteSinglePhotographer,
  updateSinglePhotographer,
} from "../controllers/photographer.controllers.js";

const router = express.Router();

router.post("/", createPhotographer);
router.get("/:id", getSinglePhotographer);
router.get("/", getAllPhotographers);
router.delete("/:id", deleteSinglePhotographer);
router.put("/:id", updateSinglePhotographer);

export default router;
