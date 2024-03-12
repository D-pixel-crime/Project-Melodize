import mongoose from "mongoose";

// How to create a model:
// Step 1 : Import mongoose
// Step 2 : Create a mongoose schema {structure of user in this case}
// Step 3 : Create a model

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false, // default value
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: String, // will be changed to array later
    default: "",
  },
  likedPlaylists: {
    type: String, // will be changed to array later
    default: "",
  },
  subscribedArtists: {
    type: String, // will be changed to array later
    default: "",
  },
});

export const UserModel = mongoose.model("User", User);
