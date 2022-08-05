//https://youtu.be/T6fRWZWrJzI

export default async function (req, res) {
  const cookiename = process.env.COOKIENAME;
  const jwt = req.cookies[cookiename];
  return res.status(200).json({ token: jwt ? jwt : null });
}
