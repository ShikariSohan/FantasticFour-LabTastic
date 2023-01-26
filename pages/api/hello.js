
import dbConnect from '../../middleware/dbConnect'
import User from '../../model/User'
export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
        res.status(200).json({ success: true, data: users })
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
