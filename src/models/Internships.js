import mongoose from "mongoose";

const validDisabilities = [
    "Autism", "ADHD", "Blind", "Down Syndrome", "Dyslexia", "Mute", 
    "Fetal Alcohol", "Dyscalculia", "Amputate", "Syndrome", "APD", 
    "Narcolepsy", "Fragile X", "Deaf", "Other"
];

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillType: {
        type: String,
        required: true,
        enum: ["Practical Skill", "Labor Intensive Skill", "Technical Skills", "Business Skill", "Care and Health"]
    },
    disabilityType: {
        type: [String],
        required: true,
        enum: validDisabilities
    },
    duration: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    reviews: [
        {
            internId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            rating: {type: Number, min: 1, max: 5},
            comment: {type: String}
        }
    ],
    pdfCourses: {
        type: [String]//arrays of URLs to pdf courses
    }
})

export default mongoose.model("Internship", internshipSchema);