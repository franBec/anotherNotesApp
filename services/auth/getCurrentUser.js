import { verify } from "./signAndVerify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (jwt) {
  const cookieSecret = process.env.COOKIESECRET;

  try {
    const { payload } = await verify(jwt, cookieSecret);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: payload,
      },
    });
    return { currentUser: currentUser, message: "ok" };
  } catch (error) {
    return {
      currentUser: null,
      message: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
