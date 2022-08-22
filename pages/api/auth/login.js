//https://youtu.be/T6fRWZWrJzI

import { sign } from "../../../services/auth/signAndVerify";
import { serialize } from "cookie";
import { login } from "../../../controllers/loginController";

import {
  handleStatus405,
  handleStatus500,
} from "../../../services/api/handleStatusXXX";

const cookiename = process.env.COOKIENAME;
const cookieSecret = process.env.COOKIESECRET;

const fileName = "api/auth/login.js";
const expectedMethod = "POST";

export default async function (req, res) {
  try {
    //check for status 405
    if (req.method !== expectedMethod)
      return res
        .status(405)
        .json(handleStatus405(fileName, expectedMethod, req.method));

    //check with the database
    const loginResponse = await login(req.body);

    //credentials ok
    if (loginResponse.status === 200) {
      const token = await sign(loginResponse.data.id, cookieSecret);

      res.setHeader(
        "Set-Cookie",
        serialize(cookiename, token, {
          httpOnly: true,
          maxAge: 3600,
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(200).json(loginResponse);
    }

    //something was not ok
    return res.status(loginResponse.status).json(loginResponse);
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error));
  }
}
