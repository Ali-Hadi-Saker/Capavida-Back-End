import Community from "../models/community.js";

export const createCommunity = async (req, res)=> {
    try {
        const {name, description, slogan, policies, picture} = req.body;
        const creatorId = req.user.id;

        const existedCommunity = await Community.findOne({name});
        if (existedCommunity) {
            return res.status(400).json({message: "Community name already exist"});
        }

        const newCommunity = new Community({
            name,
            description,
            slogan,
            policies,
            picture,
            creatorId,
            members: [creatorId]
        });

        await newCommunity.save();
        return res.status(201).json({message: "Community created successfully", newCommunity});
        
    } catch (error) {
        res.status(500).json({ error: "Error creating community", details: error.message})
        
    }
}