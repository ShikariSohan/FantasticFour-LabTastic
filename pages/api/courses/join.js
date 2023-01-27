import dbConnect from "../../../middleware/dbConnect";
import Classroom from "../../../model/Classroom";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  console.log(method);

  switch (method) {
    case "GET":
      res.status(200).json({ success: true });
      break;
    case "POST":
      try {
        if (!req.cookies.authToken) return res.send(401);
        const user = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
        const { code } = req.body;
        const data = await Classroom.findOne({ code });
        if (!data) return res.status(400).json({ success: false });
        // update the classroom with the new student id in student array
        await Classroom.updateOne(
          { _id: data._id },
          { $push: { students: user.user.id } },
          { new: true }
        );
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
