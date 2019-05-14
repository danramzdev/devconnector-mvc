const express = require("express");
const connectDB = require("./config/db");

// Controllers
const usersController = require('./controllers/users')
const authController = require('./controllers/auth')
const postsController = require('./controllers/posts')
const profileController = require('./controllers/profile')
const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

// Routes
require('./routes/api/users')(app, usersController)
require('./routes/api/auth')(app, authController)
require('./routes/api/posts')(app, postsController)
require('./routes/api/profile')(app, profileController)
app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
