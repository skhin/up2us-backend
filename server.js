const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db");

const cors = require("cors");

const path = require("path");

const authRoutes = require("./routes/authRoute");
const restaurantRoutes = require("./routes/restaurantRoutes");
const userSettingRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from the Other Side");
});

app.use("/api", authRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", userSettingRoutes);

// For HEROKU deployment
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  // Index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

//  ************** LISTENER ************** //
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

///////////////////////////////////////////
