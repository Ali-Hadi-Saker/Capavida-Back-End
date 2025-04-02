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
        
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}