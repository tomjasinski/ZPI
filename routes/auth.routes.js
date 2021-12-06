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
      verifySignUp.checkDuplicatedUserData,
      verifySignUp.checkRole
    ], [authJwt.verifyToken, authJwt.isAdmin],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/refreshToken", controller.refreshToken);
  app.put("/api/auth/put/:id", [authJwt.verifyToken, authJwt.isAdmin], verifySignUp.checkDuplicatedUserData, controller.update);

  app.delete("/api/auth/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

};