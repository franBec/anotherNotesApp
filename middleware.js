//https://nextjs.org/docs/messages/nested-middleware

import { NextResponse } from "next/server";
import { verify } from "./services/auth/signAndVerify";

export default async function middleware(req) {
  const cookiename = process.env.COOKIENAME;
  const cookieSecret = process.env.COOKIESECRET;

  const jwt = req.cookies.get(cookiename);

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

export const config = {
  matcher: ["/archivedNotes", "/myNotes"],
};
