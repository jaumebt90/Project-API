const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
