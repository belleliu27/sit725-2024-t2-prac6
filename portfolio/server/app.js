const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://shmp:shmp@cluster27.d6hauw2.mongodb.net/portfolio?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Use routes
app.use("/", routes);

// API Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  res.status(200).json({ message: "Message received!" });
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Export app for testing
module.exports = app;
