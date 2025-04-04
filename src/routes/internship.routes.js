import express from 'express';
import { createInternship, deleteInternship, getAllInternships, getInternshipById, enrollInternship, getUserEnrolledInternships } from '../controllers/internshipController.js';
import { isAuth } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/",isAuth, createInternship);
router.get("/", getAllInternships);
router.get("/:id", getInternshipById);
router.delete("/:id", deleteInternship);
router.post("/:id/enroll", isAuth, enrollInternship);
router.get("/enrolled/me", isAuth, getUserEnrolledInternships);

export default router;

