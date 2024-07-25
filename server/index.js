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

// Define the allowed origins
const allowedOrigins = [
  'https://66a1e5e56c7a62a862ee35d5--fantastic-pony-b3b050.netlify.app',
  'http://localhost:3000' // Add other allowed origins as needed
];

// Apply middleware for CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
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
