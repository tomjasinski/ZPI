const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.multipleFiles = require("./multipleFile.js")(mongoose);
db.singleFiles = require("./singleFile.js")(mongoose);

module.exports = db;