import express from "express"
import { createMarketplace } from "../controllers/marketplaceController";
import { getAllCommunities, getCommunityById } from "../controllers/communityController";

const router = express.Router();

router.post("/", createMarketplace)
router.get("/", getAllCommunities)
router.get("/:id", getCommunityById)

export default router