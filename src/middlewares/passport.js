const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { findUserById } = require("../models/users");
require('dotenv').config();
const secretKey = process.env.JWTSECRET

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await findUserById(payload.userId);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Unauthorized: User not found" });
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
