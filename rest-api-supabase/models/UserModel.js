const userSchema = {
  _id: {
    type: String,
    required: true,
    default: "uuid()",
  },
  name: {
    type: String,
    required: true,
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
    trim: true,
  },
  photo: {
    type: String,
    required: [true, "Please provide pic"],
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
};
