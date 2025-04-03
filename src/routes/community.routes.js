import express from 'express';
import { createCommunity, getAllCommunities, getCommunityById, joinCommunity } from '../controllers/communityController.js';

const router = express.Router();

router.post("/create", createCommunity);
router.get("/", getAllCommunities);
router.get("/:id", getCommunityById);
router.get("/join", joinCommunity);

export default router;
