import express from "express";
import passport from "passport";
import { SongModel as Song } from "../models/Song.js";
import { UserModel as User } from "../models/User.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    const artist = req.user._id;
    if (!name || !thumbnail || !track || !artist) {
      return res
        .status(301)
        .json({ error: "Insufficient details to create a song" });
    }
    const songDetails = { name, thumbnail, track, artist };
    try {
      const createdSong = await Song.create(songDetails);
      return res.status(200).json(createdSong);
    } catch (err) {
      return res.status(403).json({ error: "Error while creating song" });
    }
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    try {
      const songs = await Song.find({ artist: currentUser._id }).populate(
        "artist"
      );
      return res.status(200).json({ data: songs });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

router.get(
  "/get/singleSong/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id }).populate("artist");
      return res.status(200).json({ data: song });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

router.get(
  "/get/artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.body;
    try {
      const artist = await User.findOne({ _id: artistId });
      if (!artist) {
        return res.status(301).json({ error: "User doesn't exist" });
      }
      const songs = await Song.find({ artist: artistId });
      return res.status(200).json({ data: songs });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

router.get(
  "/get/songName/:body",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songName = req.params.body;
    try {
      const songs = await Song.find({
        name: { $regex: songName, $options: "i" },
      }).populate("artist");
      return res.status(200).json({ data: songs });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

export { router };
