import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = { email: "shijas@gmail.com", password: "123456" };
    if (email == user.email && password == user.password) {
      const token = jwt.sign(
        { user: true, id: user.email },
        process.env.JWT_SECRET
      );
      return res
        .cookie("usertoken", token, {
          httpOnly: true, // cannot access via JS on frontend
          secure: true, // send only over HTTPS
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          sameSite: "none", // required if frontend & backend are different origins
        })
        .json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "something went wront" });
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
