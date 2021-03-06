const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const expressHbs = require("express-handlebars");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Development logging
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// Init logging middleware
// app.use(logger);

// Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars
const hbs = expressHbs.create({});
app.engine("handlebars", expressHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// HB Helpers
hbs.handlebars.registerHelper("color", function (options) {
  if (options == "yes") return "<i class='fas fa-check fa-2x '></i>";
  else return "<i class='fas fa-times fa-2x'></i>";
});

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

app.use("/api/foods", require("./routes/api/foods"));

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`)
);
