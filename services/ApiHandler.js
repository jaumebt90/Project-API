const axios = require("axios");

class CharactersApi {
  constructor() {
    this.api = axios.create({
      baseURL: "https://akabab.github.io/starwars-api/api",
    });
  }

  getAllCharacters = () => this.api.get("/all.json");
}

module.exports = CharactersApi;
