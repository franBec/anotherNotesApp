import { verify } from "./signAndVerify";
import { prisma } from "../../db";

export default async function (jwt) {
  const cookieSecret = process.env.COOKIESECRET;

  try {
    const { payload } = await verify(jwt, cookieSecret);
    /*
    const currentUser = await prisma.user.findUnique({
      where: {
        id: payload,
      },
    });
    */
    return { currentUserId: payload, message: "ok" };
  } catch (error) {
    return {
      currentUserId: null,
      message: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
