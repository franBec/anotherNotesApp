//https://youtu.be/T6fRWZWrJzI

import { serialize } from "cookie";

export default async function (req, res) {
  const cookiename = process.env.COOKIENAME;
  const jwt = req.cookies[cookiename];

  if (!jwt) {
    return res
      .status(400)
      .json({ message: "There's no session currently active" });
  }

  res.setHeader(
    "Set-Cookie",
    serialize(cookiename, null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    })
  );

  return res.status(200).json({ message: "Logout success!" });
}
