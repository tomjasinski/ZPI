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
    ], [authJwt.verifyToken, authJwt.isAdmin],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/refreshtoken", controller.refreshToken);
  app.put("/api/auth/put/:id", [authJwt.verifyToken, authJwt.isAdmin], verifySignUp.checkDuplicateUsernameOrEmail, controller.update);

  app.delete("/api/auth/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

};