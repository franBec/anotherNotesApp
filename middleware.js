//https://nextjs.org/docs/messages/nested-middleware

import { NextResponse } from "next/server";
import { verify } from "./services/auth/signAndVerify";

import protectedRoutes from "./services/auth/protectedRoutes";

export default async function middleware(req) {
  const cookiename = process.env.COOKIENAME;
  const cookieSecret = process.env.COOKIESECRET;

  const jwt = req.cookies.get(cookiename);
  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    if (jwt === undefined) {
      req.nextUrl.pathname = "/";
      return NextResponse.redirect(req.nextUrl);
    }
    try {
      await verify(jwt, cookieSecret);
      return NextResponse.next();
    } catch (error) {
      req.nextUrl.pathname = "/";
      return NextResponse.redirect(req.nextUrl);
    }
  }
  return NextResponse.next();
}
