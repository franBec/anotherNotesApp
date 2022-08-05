//https://youtu.be/T6fRWZWrJzI

import { sign } from "../../../services/auth/signAndVerify";
import { serialize } from "cookie";

const cookiename = process.env.COOKIENAME;
const cookieSecret = process.env.COOKIESECRET;

export default async function (req, res) {
  const { username, password } = req.body;
  console.log(
    new Date().toUTCString() +
      " api/auth/login.js -> USERNAME: " +
      username +
      " PASSWORD: " +
      password
  );

  //TODO: check with the database
  if (username === "admin" && password === "admin") {
    //TODO: create a session and store it in a session table
    const token = await sign("session_uuid_here", cookieSecret);

    res.setHeader(
      "Set-Cookie",
      serialize(cookiename, token, {
        httpOnly: true,
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      })
    );

    return res.status(200).json({ success: true, message: "Login success!" });
  }

  return res
    .status(401)
    .json({ success: true, message: "Invalid credentials" });
}
