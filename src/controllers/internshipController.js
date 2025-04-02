import Internship from "../models/Internships.js";

export const createInternship = async (req, res) => {
    try {
        const {title, description, skillType, disabilityType, duration, location, pdfCourses} = req.body;
        const providerId = req.user.id;

        const newInternship = new Internship({
            title, description, providerId, skillType, disabilityType, duration, location, pdfCourses
        })

        await newInternship.save();
        res.status(201).json({message: "Internship created successfully", Internship: newInternship});
    } catch (error) {
        res.status(500).json({ error: "Error creating internship", details: error.message})
    }
}

export const getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find().populate("providerId", "name");
        res.status(200).json(internships);
        
    } catch (error) {
        res.status(500).json({ error: "Error fetching internship", details: error.message})
    }
}

export const getAllInternshipById = async (req, res) => {
    try {
        const internships = await Internship.findById(req.params.id).populate("providerId", "name");
        res.status(200).json(internships);
        
    } catch (error) {
        res.status(500).json({ error: "Error fetching internship", details: error.message})
    }
}