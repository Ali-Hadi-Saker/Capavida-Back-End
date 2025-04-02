require("dotenv").config();//initializes dotenv so we can access variables using process.env
const express = require("express");//imports the Express module.
const connectDB = require("./config/db.js")

const app = express();//Creates an instance of an Express application
app.use(express.json());//middleware that parses incoming JSON requests.

const PORT = process.env.PORT || 5000;//Starts the Express server on the defined PORT

// Connect to MongoDB
connectDB();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));