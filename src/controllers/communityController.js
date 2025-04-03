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

export const getAllCommunities = async (req, res)=> {
    try {
        const communities = await Community.find.populate("creatorId", "name");
        res.status(200).json(communities);
    } catch (error) {
        res.status(500).json({ error: "Error frtching community", details: error.message});        
    }
}

export const getCommunityById = async (req, res)=> {
    try {
        const community = await Community.findById(req.params.id).populate("creatorId", "name");
        if (!community) {
            return res.status(404).json({message: "Community not found"});
        }

        res.status(200).json(community);

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

export const joinCommunity = async (req, res)=> {
    try {
        const community = await Community.findById(req.params.id).populate("creatorId", "name");
        if (!community) {
            return res.status(404).json({message: "Community not found"});
        }

        if(community.members.includes(req.user.id)) {
            return res.status(400).json({message: "You are already member"});
        }

        community.members.push(req.user.id);
        await community.save();

        res.status(200).json({message: "joined community successfully", community});

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

export const leaveCommunity = async (req, res)=> {
    try {
        const community = req.params.id;
        if (!community.members.includes(req.user.id)) {
            return res.status(400).json({message: "You are not member of this community"});
        }

        community.members = community.members.filter(member => member.toString() !== req.user.id);
        await community.save();
        res.status(200).json({message: "Left community successfully", community});

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    
    }
}