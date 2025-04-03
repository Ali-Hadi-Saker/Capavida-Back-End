import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import internshipRoutes from "./routes/internship.routes.js"
import communityRoutes from "./routes/community.routes.js"
import marketplaceRoutes from "./routes/marketplace.routes.js"

dotenv.config(); // Initializes dotenv so we can access variables using process.env

const app = express(); // Creates an instance of an Express application

app.use(express.json()); // Middleware that parses incoming JSON requests
app.use(cors());

const PORT = process.env.PORT || 5000; // Starts the Express server on the defined PORT

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/internship", internshipRoutes)
app.use("/api/communities", communityRoutes)
app.use("/api/marketplace", marketplaceRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));