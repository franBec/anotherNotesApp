//https://youtu.be/T6fRWZWrJzI

import { sign } from "../../../services/auth/signAndVerify";
import { serialize } from "cookie";
import loginController from "../../../controllers/loginController";

const cookiename = process.env.COOKIENAME;
const cookieSecret = process.env.COOKIESECRET;

export default async function (req, res) {
  const { mail, password } = req.body;
  console.log(
    new Date().toUTCString() +
      " api/auth/login.js -> MAIL: " +
      mail +
      " PASSWORD: " +
      password
  );

  //check with the database
  const loginStatus = await loginController(mail, password);

  //credentials ok
  if (loginStatus === 200) {
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

  //credentials invalid
  if (loginStatus === 401) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  //error
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
}
