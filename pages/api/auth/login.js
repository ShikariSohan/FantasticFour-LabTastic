import dbConnect from "../../../middleware/dbConnect";
import User from "../../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return res.status(200).json({ success: true });
      break;
    case "POST":
      try {
        const { email, password } = req.body;
        console.log("req.cookies: ", req.cookies);
        const user = await User.findOne({ email });
        console.log("user: ", user);
        if (!user) {
          return res
            .status(400)
            .json({ success: false, error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch: ", isMatch);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, error: "Invalid credentials" });
        }
        const payload = {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
        };
        console.log("payload: ", payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });
        console.log("login token: ", token);

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 12 * 3600,
            path: "/",
          })
        );
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
