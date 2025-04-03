import express from 'express';
import { createCommunity, getAllCommunities, getCommunityById, joinCommunity, leaveCommunity } from '../controllers/communityController.js';

const router = express.Router();

router.post("/create", createCommunity);
router.get("/", getAllCommunities);
router.get("/:id", getCommunityById);
router.get("/join", joinCommunity);
router.get("/leave", leaveCommunity);

export default router;
