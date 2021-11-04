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


require("./routes/user.routes.js")(app);
require("./routes/fileRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080; //4200
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


