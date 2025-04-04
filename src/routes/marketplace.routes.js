import express from "express"
import { createMarketplace, getAllMarketplace, getMarketplaceById } from "../controllers/marketplaceController.js";

const router = express.Router();

router.post("/", createMarketplace)
router.get("/", getAllMarketplace)
router.get("/:id", getMarketplaceById)

export default router