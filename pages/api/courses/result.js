import dbConnect from "../../../middleware/dbConnect";
import Result from "../../../model/Result";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  console.log(method);

  switch (method) {
    case "POST":
        try {
            const { taskId,studentId } = req.body;
            const all = await Result.find({})
            const ans =[];
            for(let i=0;i<all.length;i++){
                if(all[i].student===studentId&&all[i].task===taskId){
                    ans.push(all[i]);
                }
            }
            res.status(201).json({ success: true, data: ans })
          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
    default:
      res.status(400).json({ success: false });
      break;
  }
}
