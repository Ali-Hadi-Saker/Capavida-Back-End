import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const memberCodes = [
    "NNJ - 01 - Ex", "EMW - 02 - Ex", "SHL - 03 - Ex", "TSB - 04 - Mk",
    "JBH - 05 - Mk", "RBC - 06 - Mk", "GAK - 07 - SD", "SHD - 08 - Sl",
    "SBN - 09 - Fn", "JZD - 10 - HR", "SAD - 11 - HR", "KAN - 12 - D"
];

export const registerUser = async (req, res)=> {
    try {
        const {name, email, password, phone, role, disabilityCardCode, disabilityTypes, memberCode} = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        if(role === "member" && !memberCodes.includes(memberCode)) {
            return res.status(400).json({message: "Invalid member code!"});
        }

        // Enforce disability selection rules for interns
        if (role === "intern") {
            const validDisabilities = [
                "Autism", "ADHD", "Blind", "Down Syndrome", "Dyslexia", "Mute", 
                "Fetal Alcohol", "Dyscalculia", "Amputate", "Syndrome", "APD", 
                "Narcolepsy", "Fragile X", "Deaf", "Other"
            ];

            if (!Array.isArray(disabilityTypes) || disabilityTypes.length === 0) {
                return res.status(400).json({ message: "You must select at least one disability." });
            }
        }

        const newUser = new User({name, email, password: hashedPassword, disabilityCardCode, disabilityTypes, memberCode, phone, role});
        await newUser.save();

        res.status(201).json({message: "User registerd successfully"});


    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}

export const loginUser = async (req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "wrong credentials"});

        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}