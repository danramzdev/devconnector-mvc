// External libraries
const express = require("express");

// Requires
const connectDB = require("./config/db");

// Consts
const PORT = process.env.PORT || 5000;

// Controllers
const usersController = require("./controllers/users");
const authController = require("./controllers/auth");
const postsController = require("./controllers/posts");
const profileController = require("./controllers/profile");

// Init express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// Connect Database
connectDB();

// Routes
require("./routes/api/users")(app, usersController);
require("./routes/api/auth")(app, authController);
require("./routes/api/posts")(app, postsController);
require("./routes/api/profile")(app, profileController);
app.get("/", (req, res) => res.send("API Running"));

// Server listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
