import express from "express";
import bcrypt from "bcrypt";
import { UserModel as User } from "../models/User.js";
import { getToken } from "../utils/helpers.js";

const router = express.Router();

//register a user
router.post("/register", async (req, res) => {
  //req.body will be of the format {email,password,firstName,lastName,username}
  const { email, password, firstName, lastName, username } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(403) //default status is 200
        .json({ error: "A user with this email already exists" });
    }
  } catch (err) {
    return res
      .status(403)
      .json({ error: `Error in finding user\n-${err.message}` });
  }

  //we can't store the plain text password as it is, we need to convert it to a hash
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };

  let newUser;
  try {
    newUser = await User.create(newUserData);
  } catch (err) {
    return res
      .status(403)
      .json({ error: `Error in creating user\n-${err.message}` });
  }

  let token;
  try {
    token = await getToken(email, newUser);
  } catch (err) {
    return res
      .status(403)
      .json({ error: `Error in generating token\n-${err.message}` });
  }

  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const resp = await User.findOne({ email: email });
    if (resp) {
      const isPasswordValid = await bcrypt.compareSync(password, resp.password);
      if (isPasswordValid) {
        const token = await getToken(resp.email, resp);
        const userToReturn = { ...resp.toJSON(), token };
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
      }
      return res.status(403).json({ error: "Invalid login credentials" }); //but giving different error messages is said to be good practice
    }
    return res.status(403).json({ error: "User doesn't exist" });
  } catch (err) {
    return res
      .status(403)
      .json({ error: `Error while login -> ${err.message}` });
  }
});

export { router };
