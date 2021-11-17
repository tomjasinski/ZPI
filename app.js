const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path'); //added

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//added

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const db = require("./models");

const Role = db.role; //added

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


//require("./routes/user.routes.js")(app);
require("./routes/fileRoutes.js")(app);

require("./routes/auth.routes.js")(app); //added

// set port, listen for requests
const PORT = process.env.PORT || 8080; //4200
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
 
//added
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "client"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'client' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


