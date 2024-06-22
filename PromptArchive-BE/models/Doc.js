const { model, Schema } = require("mongoose");
const docSchema = new Schema({
  title: { type: String, required: true },

  content: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Doc", docSchema);
