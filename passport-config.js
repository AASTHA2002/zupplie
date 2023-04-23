const loacalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport) {
    //function to authenticate users
    const authenticateUsers = async(email, password, done) => {
        //get users by email
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, {
                message: "no user is registered in this email",
            });
        }
        try {
            if (await bcrypt.compare(password, user.password))

        } catch (e) {}
    };
}