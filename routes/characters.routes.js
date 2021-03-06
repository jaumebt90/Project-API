const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/Character.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const CharactersAPI = new Api();

router.get("/characters", (req, res) => {
  CharactersAPI.getAllCharacters()
    .then((allCharacters) => {
      //console.log(allCharacters.data);
      res.render(`characters/list`, { characters: allCharacters.data });
    })
    .catch((err) => console.log(err));
});

router.post("/add-favorite", isLoggedIn, (req, res) => {
  //console.log(req.body);
  //return;
  const query = ({ name, species, gender, homeworld, image, apiId } = req.body);
  const idToCheck = req.body.apiId;
  Character.find({ apiId: idToCheck }).then((charArray) => {
    if (charArray.length === 0) {
      Character.create(query)
        .then((result) => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { favorites: result._id },
          }).then(() => {
            res.redirect("/characters");
          });
        })
        .catch((err) => console.log(err));
    } else {
      User.findById(req.user._id)
        .then((user) => {
          if (!user.favorites.includes(charArray[0]._id)) {
            User.findByIdAndUpdate(req.user._id, {
              $push: { favorites: charArray[0]._id },
            }).then(() => {
              res.redirect("/characters");
            });
          } else {
            res.redirect("/characters");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

router.post("/delete-favorite", isLoggedIn, (req, res) => {
  const { id } = req.body;
  User.findByIdAndUpdate(req.user._id, { $pull: { favorites: id } })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
