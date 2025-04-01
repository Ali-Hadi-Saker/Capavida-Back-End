require("dotenv").config();//initializes dotenv so we can access variables using process.env
const express = require("express");//imports the Express module.
const mongoose = require("mongoose");

const app = express();//Creates an instance of an Express application
app.use(express.json());//middleware that parses incoming JSON requests.

const PORT = process.env.PORT || 5000;//Starts the Express server on the defined PORT
const MONGO_URI = process.env.MONGO_URI

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined! Check your .env file.");
    process.exit(1);
    }

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Node.js API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));