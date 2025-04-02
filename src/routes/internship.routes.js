import express from 'express';
import { createInternship, deleteInternship, getAllInternships, getInternshipById } from '../controllers/internshipController.js';


const router = express.Router();

router.post("/", createInternship);
router.get("/", getAllInternships);
router.get("/:id", getInternshipById);
router.delete("/:id", deleteInternship);

export default router;

