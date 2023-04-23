//important libraries that we installed using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); //important bcrypt package

const users = [];
app.use(express.urlencoded({ extended: false }));
//routes
app.use(express.static("static"));
app.post("/register", async (req, res) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
    });
    console.log(users); //dispaly newly registered users
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
//end routes

app.listen(3000);
