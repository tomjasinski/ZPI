const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.multipleFiles = require("./multipleFile.js")(mongoose);
db.singleFiles = require("./singleFile.js")(mongoose);
db.subs = require("./sub.model.js")(mongoose);

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");


db.ROLES = ["client", "admin"]; //client + admin


module.exports = db;