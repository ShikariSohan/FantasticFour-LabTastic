import dbConnect from "../../../middleware/dbConnect";
import Task from "../../../model/Task";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const data = await Task.find({
          classroom: id,
        });
        res.status(201).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
