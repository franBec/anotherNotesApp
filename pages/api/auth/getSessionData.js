//does the same that services/auth/getSessionData

import { verify } from "../../../services/auth/signAndVerify";
export default async function (req, res) {
  const cookiename = process.env.COOKIENAME;
  const cookieSecret = process.env.COOKIESECRET;

  const jwt = req.cookies[cookiename];
  try {
    const payload = await verify(jwt, cookieSecret);

    return res.status(200).json({
      loggedIn: true,
      ...payload,
      message: null,
    });
  } catch (error) {
    return res.status(500).json({
      loggedIn: false,
      payload: null,
      exp: null,
      iat: null,
      nbf: null,
      message: error.message,
    });
  }
}
