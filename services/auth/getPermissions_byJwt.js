import { verify } from "./signAndVerify";
import { prisma } from "../../db";

export default async function (jwt) {
  const cookieSecret = process.env.COOKIESECRET;

  try {
    const { payload } = await verify(jwt, cookieSecret);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: payload,
      },
      include: {
        rols: {
          include: {
            permissions: true,
          },
        },
      },
    });

    var permissionArray = [];
    for (const rol of currentUser.rols) {
      for (const permission of rol.permissions) {
        if (!permissionArray.some((it) => it.id === permission.id)) {
          permissionArray.push(permission.name);
        }
      }
    }

    return { loggedIn: true, permissions: permissionArray, message: "ok" };
  } catch (error) {
    return {
      loggedIn: false,
      permissions: null,
      message: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
