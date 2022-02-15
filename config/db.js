const mongoose = require("mongoose");

const DB = "mongodb+srv://skhin:n0fd3vl49Pz98Bsh@up2us.uculk.mongodb.net/Data";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected to Mongo");
  })
  .catch((err) => {
    console.log("db err", err);
    console.log("Database not connected to Mongo");
  });
