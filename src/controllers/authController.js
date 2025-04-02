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
        const {name, email, password, phone, role, disabilityCardCode, disabilityType, memberCode} = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        if(role === "member" && !memberCodes.includes(memberCode)) {
            return res.status(400).json({message: "Invalid member code!"});
        }

        const newUser = new User({name, email, password: hashedPassword, disabilityCardCode, disabilityType, memberCode, phone, role});
        await newUser.save();

        res.status(201).json({message: "User registerd successfully"});


    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}