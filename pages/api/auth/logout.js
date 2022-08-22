//https://youtu.be/T6fRWZWrJzI

import { serialize } from "cookie";

import {
  handleStatus200,
  handleStatus400,
  handleStatus500,
} from "../../../services/api/handleStatusXXX";

const fileName = "api/auth/logout.js";

export default async function (req, res) {
  try {
    const cookiename = process.env.COOKIENAME;
    const jwt = req.cookies[cookiename];

    //check for status 400
    if (!jwt) {
      return res
        .status(400)
        .json(handleStatus400(fileName, "There's no session currently active"));
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

    return res.status(200).json(handleStatus200("Logout success!"));
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error));
  }
}
