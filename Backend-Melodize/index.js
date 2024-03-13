import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { UserModel as User } from "./models/User.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as songRoutes } from "./routes/songRoutes.js";
import { router as playlistRoutes } from "./routes/playlistRoutes.js";
import axios from "axios";

const port = 1022;
const app = express();

app.use(cors());
app.use(morgan("short"));
app.use(express.json());

let pass = encodeURIComponent(process.env.MONGO_PASSWORD);

const connectToDb = async () => {
  try {
    const resp = await mongoose.connect(
      `mongodb+srv://newcriminal:${pass}@darkdementor.rhallfz.mongodb.net/?retryWrites=true&w=majority`,
      {}
    );
    console.log("Connected to Mongo!");
  } catch (err) {
    console.log(`Error!\n${err.message}`);
  }
};

connectToDb();

// var JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
