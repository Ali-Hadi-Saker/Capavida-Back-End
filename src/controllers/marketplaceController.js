import Marketplace from "../models/marketplace.js"; 

// Create a new marketplace item
export const createMarketplace = async (req, res) => {
    try {
        const { name, ownerName, location, category, disabilityType, description } = req.body;

        if (!name || !description || !ownerName || !category || !location || !disabilityType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMarketplace = new Marketplace({
            name,
            description,
            ownerName,
            category,
            disabilityType,
            location
        });

        await newMarketplace.save();
        res.status(201).json({ 
            message: "Marketplace item created successfully", 
            item: newMarketplace 
        });

    } catch (error) {
        res.status(500).json({ error: "Error creating market item", details: error.message });
    }
};

// Get all marketplace items
export const getAllMarketplace = async (req, res) => {
    try {
        const items = await Marketplace.find();
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: "Error fetching marketplace items", details: error.message });
    }
};

// Get marketplace item by ID
export const getMarketplaceById = async (req, res) => {
    try {
        const item = await Marketplace.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Marketplace item not found" });
        }

        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ error: "Error fetching market item", details: error.message });
    }
};
