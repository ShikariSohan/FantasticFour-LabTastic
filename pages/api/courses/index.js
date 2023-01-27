import dbConnect from "../../../middleware/dbConnect";
import Classroom from "../../../model/Classroom";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  console.log(method);

  switch (method) {
    case "GET":
      try {
        console.log(req.headers.authtoken);
        if (req.headers.authtoken == undefined) return res.send(401);

        const user = jwt.verify(req.headers.authtoken, process.env.JWT_SECRET);
        const id = user.user.id;
        const classrooms = await Classroom.find({ teacher: id });
        console.log(classrooms);
        res.status(200).json({ success: true, data: classrooms });
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
