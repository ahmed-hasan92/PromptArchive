const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  profileCreatedAt: { type: Date, default: Date.now },
  docs: [{ type: Schema.Types.ObjectId, ref: "Doc" }],
});

module.exports = model("User", userSchema);
