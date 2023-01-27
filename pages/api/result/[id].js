import dbConnect from "../../../middleware/dbConnect";
import Score from "../../../model/Score";
import User from "../../../model/User";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { id } = req.query;
        console.log(req.body);
        console.log(id);
        const data = await Score.create({
          student: req.body.user,
          task: id,
          score: req.body.score,
        });
        res.status(201).json({ success: true, data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const { id } = req.query;
        const data = await Score.findOne({
          _id: id,
        }).populate("student");
        const user = await User.find({
          _id: id,
        });
        const d = {
          name: user.name,
          email: user.email,
          score: "2",
        };
        console.log();
        res.status(201).json({ success: true, data: d });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
