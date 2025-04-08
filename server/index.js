const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    credentials: true, // Allow credentials (cookies, local storage, etc.) to be included in requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    headers: ["Content-Type", "Authorization"], // Allow these headers
  })
);
app.use(express.json());

// Routes
const eventRoutes = require("./routes/events");
app.use("/api/events", eventRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
