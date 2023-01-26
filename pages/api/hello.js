
export default async function handler (req, res) {
  const { method } = req

  

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ success: true})
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
