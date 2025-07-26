import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(name,email,password);
    
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const newUser = new User({
      name,
      email,
      password, // In production, hash it with bcrypt!
    });

    await newUser.save();
    return res.status(201).json({ success: true });
  } catch (err) {
    console.log("Signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("error here no user");

      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await password===user.password
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("usertoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({ success: true, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}
export async function checkAuth(req, res) {
  try {
    const token = req.cookies.usertoken;
    if (!token) return res.status(401).json({ loggedIn: false });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ loggedIn: true, user: decoded });
    } catch (err) {
      return res.status(401).json({ loggedIn: false });
    }
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
}

export async function logout(req, res) {
  res
    .cookie("usertoken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "Logged out", error: false });
}
