//https://youtu.be/T6fRWZWrJzI

import { sign } from "../../../services/auth/signAndVerify";
import { serialize } from "cookie";
import loginController from "../../../controllers/loginController";
import logger from "../../../services/logger";

const cookiename = process.env.COOKIENAME;
const cookieSecret = process.env.COOKIESECRET;

export default async function (req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Expected POST method" });
  }

  const { mail, password } = req.body;
  logger.info("api/auth/login.js -> MAIL: " + mail + " PASSWORD: " + password);

  //check with the database
  const login = await loginController(mail, password);

  //credentials ok
  if (login.status === 200) {
    //TODO: create a session and store it in a session table
    const token = await sign(login.data.id, cookieSecret);

    res.setHeader(
      "Set-Cookie",
      serialize(cookiename, token, {
        httpOnly: true,
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      })
    );

    return res.status(200).json({
      success: true,
      message: "Login success!",
      username: login.data.name,
    });
  }

  //invalid credentials
  if (login.status === 401) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  //error
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
}
