module.exports = (app) => {
  app.use("/auth", require("./auth"));
  app.use("/", require("./characters.routes"));
  app.use("/", require("./base.routes.js"));
};
