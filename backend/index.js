const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
require("dotenv").config();

// Importing routes
const EmployeeRoutes = require("./Routes/EmployeeRoutes");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ExpenseRouter = require("./Routes/ExpenseRouter");
const ensureAuthenticated = require("./Middlewares/Auth");

// Initialize Express app and server
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8080;

// Database connection
require("./Models/db");

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(bodyParser.json());

// Health check endpoint
app.get("/ping", (req, res) => {
    res.send("PONG");
});

// API Routes
app.use("/api/employees", EmployeeRoutes);
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/expenses", ensureAuthenticated, ExpenseRouter);


// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

// Error handling
server.on("error", (error) => {
    console.error("Error in server:", error);
});
