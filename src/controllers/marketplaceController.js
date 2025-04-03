import MarketPlace from "../models/marketPlaceModel.js"; 

// Create a new marketplace item
export const createMarketPlaceItem = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields (name, description, price, category) are required" });
        }

        const newItem = new MarketPlace({
            name,
            description,
            price,
            category,
            image,
            sellerId: req.user.id, // Assuming user authentication
        });

        await newItem.save();
        res.status(201).json({ message: "Market item created successfully", item: newItem });

    } catch (error) {
        res.status(500).json({ error: "Error creating market item", details: error.message });
    }
};

// Get all marketplace items
export const getAllMarketPlaceItems = async (req, res) => {
    try {
        const items = await MarketPlace.find();
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: "Error fetching marketplace items", details: error.message });
    }
};

// Get marketplace item by ID
export const getMarketPlaceItemById = async (req, res) => {
    try {
        const item = await MarketPlace.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Marketplace item not found" });
        }

        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ error: "Error fetching market item", details: error.message });
    }
};
