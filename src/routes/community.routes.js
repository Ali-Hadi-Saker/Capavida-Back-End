import express from 'express';
import { createCommunity, getAllCommunities, getCommunityById, joinCommunity, leaveCommunity } from '../controllers/communityController.js';
import { isAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create", isAuth, createCommunity);
router.get("/", getAllCommunities);
router.get("/:id", getCommunityById);
router.post("/:id/join", isAuth, joinCommunity);
router.post("/:id/leave", isAuth, leaveCommunity);

export default router;
