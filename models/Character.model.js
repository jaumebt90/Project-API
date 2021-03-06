const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: String,
    species: String,
    gender: String,
    homeworld: String,
    image: String,
    apiId: Number,
  },
  {
    timestamps: true,
  }
);

characterSchema.pre("save", function (next) {
  const nameToUpper = this.name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  this.name = nameToUpper;

  next();
});

module.exports = model("Character", characterSchema);
