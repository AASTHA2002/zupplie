const loacalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserByid) {
  //function to authenticate users
  const authenticateUsers = async (email, password, done) => {
    //get users by email
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, {
        message: "no user is registered in this email",
      });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (e) {
      console.log(e);
      return done(e);
    }
  };
  passport.use(
    new loacalStrategy({ usernameField: "email" }, authenticateUsers)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserByid(id));
  });
}
module.exports = initialize;
