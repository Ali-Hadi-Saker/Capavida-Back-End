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

export const getInternshipById = async (req, res) => {
    try {
        const internships = await Internship.findById(req.params.id).populate("providerId", "name");
        res.status(200).json(internships);
        
    } catch (error) {
        res.status(500).json({ error: "Error fetching internship", details: error.message});
    }
}

export const deleteInternship = async (req, res)=> {
    try {
        const internship = Internship.findById(req.params.id);
        if(!internship) return res.status(404).json({error: "Internship not found"});
        
        await Internship.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Internship deleted successfully"});
        
    } catch (error) {
        res.status(500).json({ error: "Error deleting internship", details: error.message});
    }
}

export const enrollInternship = async (req, res) => {
    try {
        const internshipId = req.params.id;
        const userId = req.user.id; // From auth middleware

        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({ error: "Internship not found" });
        }

        // Check if user is already enrolled
        if (internship.enrolledUsers.includes(userId)) {
            return res.status(400).json({ error: "User already enrolled in this internship" });
        }

        // Add user to enrolled users
        internship.enrolledUsers.push(userId);
        await internship.save();

        res.status(200).json({ 
            message: "Successfully enrolled in internship",
            internship: internship
        });
    } catch (error) {
        res.status(500).json({ error: "Error enrolling in internship", details: error.message });
    }
};

export const getUserEnrolledInternships = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware

        const enrolledInternships = await Internship.find({
            enrolledUsers: userId
        }).populate("providerId", "name");

        res.status(200).json({
            message: "Successfully fetched enrolled internships",
            internships: enrolledInternships
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching enrolled internships", details: error.message });
    }
};