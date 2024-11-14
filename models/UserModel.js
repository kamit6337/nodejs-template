import mongoose from "mongoose";
import validation from "validator";
import bcrypt from "bcryptjs";
import Follower from "./FollowerModel.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validation.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    default: "",
    select: false,
    trim: true,
  },
  photo: {
    type: String,
    required: [true, "Please provide pic"],
    trim: true,
  },
  bg_photo: {
    type: String,
    default: "",
    select: false,
    trim: true,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  location: {
    type: String,
    default: "",
    trim: true,
  },
  website: {
    type: String,
    default: "",
    trim: true,
  },
  OAuthId: {
    type: String,
    default: null,
    select: false,
  },
  OAuthProvider: {
    type: String,
    default: null,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

userSchema.methods.checkPassword = function (given_password) {
  //   WORK: CHECK IF USER PASSWORD DOES NOT MATCH WITH HASH PASSWORD
  const checkPassword = bcrypt.compareSync(
    String(given_password),
    this.password
  );

  return checkPassword;
};

userSchema.pre("save", function (next) {
  // Check if there's a password to hash
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  next();
});

userSchema.pre("save", async function (next) {
  await Follower.create({
    user: this._id,
    follower: this._id,
  });

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
