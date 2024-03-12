import express from "express";
import passport from "passport";
import { PlaylistModel as Playlist } from "../models/Playlist.js";
import { UserModel as User } from "../models/User.js";
import { SongModel as Song } from "../models/Song.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs)
      return res
        .status(301)
        .json({ error: "Insufficient data for playlist creation" });
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    try {
      const resp = await Playlist.create(playlistData);
      return res.status(200).json(resp);
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    if (!playlistId)
      return res.status(403).json({ error: "No playlist provided" });
    try {
      const playlistData = await Playlist.findOne({ _id: playlistId });
      if (!playlistData)
        return res.status(301).json({ error: "Invalid playlist id" });
      return res.status(200).json({ data: playlistData });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistID = req.params.artistId;
    try {
      const artist = await User.findOne({ _id: artistID });
      if (!artist) {
        return res.status(354).json({ error: "Invalid artist ID" });
      }
      const playlists = await Playlist.find({ owner: artistID });
      return res.status(200).json({ data: playlists });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    try {
      const playlist = await Playlist.findOne({ _id: playlistId });

      if (!playlist) {
        return res.status(304).json({ error: "Playlist doesn't exist" });
      }

      console.log(currentUser._id, playlist.owner);
      if (
        playlist.owner.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
      ) {
        return res.status(400).json({ error: "Access Denied" });
      }

      const song = await Song.findOne({ _id: songId });
      if (!song) return res.status(304).json({ error: "Song doesn't exist" });

      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json({ data: playlist });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

export { router };
