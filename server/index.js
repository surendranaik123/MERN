// Import necessary modules
import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import userRoutes from "./routes/user.js";
import 'dotenv/config';

// Create an Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 9000;

// Connect to MongoDB
connectToMongo();

// Apply middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE', // Allow the specified HTTP methods
  credentials: true, // Allow sending cookies
}));

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: '50mb' }));

// Define a basic route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount user routes
app.use("/api/v1", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
