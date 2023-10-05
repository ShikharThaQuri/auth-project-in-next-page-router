const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "title must be provided"],
  },
  hash: {
    type: String,
    required: [true, "must be provided"],
  },
  salt: {
    type: String,
    required: [true, "must be provided"],
  },
});

module.exports = mongoose.models.user2 || mongoose.model("user2", userSchema);
