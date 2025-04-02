import mongoose from "mongoose";

const memberCodes = [
    "NNJ - 01 - Ex", "EMW - 02 - Ex", "SHL - 03 - Ex", "TSB - 04 - Mk",
    "JBH - 05 - Mk", "RBC - 06 - Mk", "GAK - 07 - SD", "SHD - 08 - Sl",
    "SBN - 09 - Fn", "JZD - 10 - HR", "SAD - 11 - HR", "KAN - 12 - D"
];

const validDisabilities = [
    "Autism", "ADHD", "Blind", "Down Syndrome", "Dyslexia", "Mute", 
    "Fetal Alcohol", "Dyscalculia", "Amputate", "Syndrome", "APD", 
    "Narcolepsy", "Fragile X", "Deaf", "Other"
];

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["intern", "internship", "member"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    disabilityCardCode: {
        type: String, 
        required: function() { return this.role == "intern";}
    },
    disabilityTypes: {
        type: [String], 
        required: function() { return this.role == "intern";},
        enum: validDisabilities
    },
    memberCode: {
        type: String,
        required: function() { return this.role == "member";},
        enum: memberCodes
    },
})

export default mongoose.model("User", userSchema);