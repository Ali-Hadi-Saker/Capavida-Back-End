import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillType: {
        type: [String],
        required: true
    },
    disabilityType: {
        type: [String],
        required: true
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