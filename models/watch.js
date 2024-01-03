const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hr:{
    type: String,
    default: "00",
    required: true,
  },
  min:{
    type: String,
    default: "00",
    required: true,
  },
  sec:{
    type: String,
    default: "00",
    required: true,
  },
  count:{
    type: String,
    default: "00",
    required: true,
  }

});

module.exports = mongoose.model("Post", watchSchema);