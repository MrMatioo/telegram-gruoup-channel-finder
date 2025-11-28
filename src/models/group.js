// models/Group.js
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  title: String,
  username: String,
  chatId: Number,
  members: Number,
  lastMessageDaysAgo: Number,
  adminUsername: String,
  adminBio: String,
  score: Number,
  foundAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SniperGroup", groupSchema);
