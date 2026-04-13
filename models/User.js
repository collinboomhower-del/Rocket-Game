const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  rank: { type: Number, default: 1000 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  cosmetics: [String],
  equippedCar: { type: String, default: "default" }
});

module.exports = mongoose.model("User", UserSchema);
