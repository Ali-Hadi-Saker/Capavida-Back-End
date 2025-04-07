import mongoose from "mongoose";

const validDisabilities = [
    "Autism", "ADHD", "Blind", "Down Syndrome", "Dyslexia", "Mute", 
    "Fetal Alcohol", "Dyscalculia", "Amputate", "Syndrome", "APD", 
    "Narcolepsy", "Fragile X", "Deaf", "Other"
];

const marketplaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Food Services and Products", "Textile Products and Services", "Artisan Products and Services"]
    },
    disabilityType: {
        type: [String],
        required: true,
        enum: validDisabilities
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Marketplace", marketplaceSchema);