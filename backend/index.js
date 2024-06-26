const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const User = require("./model/user_model");
const Image = require("./model/img_module");

require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000; // Set port from environment variable or default to 4000
const MONGO_URL = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);
const secret = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://the-gallery-frontend.vercel.app", // Replace with your frontend's actual origin
  })
);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json("Hello kaka!");
});

app.post("/register", async (req, res) => {
  const { name, email, password, profimgurl } = req.body;
  try {
    // Check if user with given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create a new user with hashed password
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
      profimgurl: profimgurl,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If email and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Store the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    // Return user data without password
    const { password: _, ...userData } = user.toObject();
    res.json({ user: userData });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const imgurl = req.body.imageUrl;
  const userId = req.body.userId;

  try {
    const responce = await Image.create({ userId: userId, imgurl: imgurl });
    res.json(responce);
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/images", async (req, res) => {
  try {
    const userId = req.query.userId;
    // Query the database for the user's images
    const images = await Image.find({ userId: userId }); // Query images by userId
    // Send the images as a response
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/getuser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
