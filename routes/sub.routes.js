module.exports = app => {
    const subs = require("../controllers/sub.controller.js");
  
    var router = require("express").Router();

    router.post("/", subs.create);

    router.get("/check", subs.check);

    app.use("/api/subs", router);
};
