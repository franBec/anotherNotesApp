import { verify } from "./signAndVerify";
export default async function (jwt) {
  const cookieSecret = process.env.COOKIESECRET;

  try {
    const payload = await verify(jwt, cookieSecret);

    return {
      loggedIn: true,
      ...payload,
      message: null,
    };
  } catch (error) {
    return {
      loggedIn: false,
      payload: null,
      exp: null,
      iat: null,
      nbf: null,
      message: error.message,
    };
  }
}
