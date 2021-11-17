const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ], [authJwt.verifyToken, authJwt.isAdmin], //ograniczony do admina
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/refreshtoken", controller.refreshToken);

  app.delete("/api/auth/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete); //added, ograniczony do admina
  //app.put("/api/auth/:id", controller.update); //????

};