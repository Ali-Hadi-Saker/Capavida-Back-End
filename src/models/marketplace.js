import mongoose from "mongoose";

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
        enum: ["Retail", "Technology", "Health", "Education", "Finance", "Manufacturing", "Others"]
    },
    disabledMatch: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // Referencing Users who match this marketplace
        }
    ],
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