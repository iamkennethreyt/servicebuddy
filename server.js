const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const methodOverride = require("method-override");

const users = require("./routes/api/users");
const workertypes = require("./routes/api/workertypes");
const advertisements = require("./routes/api/advertisements");
const jobs = require("./routes/api/jobs");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/key").mongoURI;
app.use(methodOverride("_method"));

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("successfully connected to the database"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//use routesadvertisements
app.use("/api/users", users);
app.use("/api/workertypes", workertypes);
app.use("/api/advertisements", advertisements);
app.use("/api/jobs", jobs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
