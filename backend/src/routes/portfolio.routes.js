import express from "express";
import {
  getAllPortfolios,
  getSinglePortfolio,
} from "../controllers/portfolio.controllers.js";

const router = express.Router();

router.get("/", getAllPortfolios);
router.get("/:id", getSinglePortfolio);

export default router;
