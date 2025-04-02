import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config(); // Initializes dotenv so we can access variables using process.env

const app = express(); // Creates an instance of an Express application

app.use(express.json()); // Middleware that parses incoming JSON requests
app.use(cors());

const PORT = process.env.PORT || 5000; // Starts the Express server on the defined PORT

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));