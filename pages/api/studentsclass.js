import dbConnect from '../../middleware/dbConnect'
import Classroom from '../../model/Classroom'
export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {

    case 'POST':
      try {
        const { id } = req.body;
        const classes = await Classroom.find({})
        const ans =[];
        // console.log(classes[0].students.length);
        for(let i=0;i<classes.length;i++){
            var flag=0;
            for(let j=0;j<classes[i].students.length;j++){
                if(classes[i].students[j].toString()==id){
                  flag=1;
                }
            }
            if(flag==1){
                ans.push(classes[i])
            }
        }
        console.log(ans)
        res.status(201).json({ success: true, data: ans })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}