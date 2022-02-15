const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const connectDB = require("./model/db");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoute");
const restaurantRoutes = require("./routes/restaurantRoutes");
const userSettingRoutes = require("./routes/userRoutes");

// OLD Config
// require("dotenv").config();
// require("./config/db");

// NEW Config
dotenv.config();
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session middleware
app.use(
  session({
    secret: "up2us",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the Other Side");
});

app.use("/api", authRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", userSettingRoutes);

// // For HEROKU deployment
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("frontend/build"));

//   // Index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
//   });
// }

//  ************** LISTENER ************** //
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

///////////////////////////////////////////

// const express = require("express");
// const app = express();

// require("dotenv").config();
// require("./config/db");

// const cors = require("cors");

// const path = require("path");

// const authRoutes = require("./routes/authRoute");
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const userSettingRoutes = require("./routes/userRoutes");

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.send("Hello from the Other Side");
// });

// app.use("/api", authRoutes);
// app.use("/api", restaurantRoutes);
// app.use("/api", userSettingRoutes);

// // // For HEROKU deployment
// // if (process.env.NODE_ENV === "production") {
// //   // Set static folder
// //   app.use(express.static("frontend/build"));

// //   // Index.html for all page routes
// //   app.get("*", (req, res) => {
// //     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
// //   });
// // }

// //  ************** LISTENER ************** //
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ///////////////////////////////////////////
