import dbConnect from "../../../middleware/dbConnect";
import User from "../../../model/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return res.status(200).json({ success: true });
      break;
    case "POST":
      try {
        const { name, email, password, role, avatar } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          role,
          avatar,
        });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
