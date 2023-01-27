import { IconTallymarks } from "@tabler/icons";
import dbConnect from "../../../middleware/dbConnect";
import Classroom from "../../../model/Classroom";
import Task from "../../../model/Task";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  console.log(method);

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        console.log(id);
        const classroom = await Classroom.findOne({ _id: id });
        const stream = await Task.find({ classroom: id });
        res.status(200).json({ success: true,  classroom,stream });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        if (!req.cookies.authToken) return res.send(401);
        const user = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
        const { name, subject, session } = req.body;
        const teacher = user.user.id;
        console.log(teacher);
        // genarate random  six digit code;
        const code = Math.floor(100000 + Math.random() * 900000);
        const classroom = await Classroom.create({
          name,
          subject,
          session,
          teacher,
          code,
        });
        console.log(classroom);
        res.status(201).json({ success: true, data: classroom });
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
