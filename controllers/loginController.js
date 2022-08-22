import { prisma } from "../db";

import {
  handleStatus200,
  handleStatus400,
  handleStatus401,
  handleStatus500,
} from "../services/api/handleStatusXXX";

const fileName = "controllers/loginController";

export const login = async ({ mail, password }) => {
  try {
    if (!mail || !password) {
      return handleStatus400(fileName, "mail and password are required");
    }

    //look for a user with provided mail
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });

    //if not user
    if (!user) {
      return handleStatus401(fileName, "Invalid credentials");
    }

    //if not valid password
    if (user.password !== password) {
      return handleStatus401(fileName, "Invalid credentials");
    }

    //all ok!
    return handleStatus200({ id: user.id, name: user.firstName });
  } catch (error) {
    return handleStatus500(fileName, error);
  } finally {
    await prisma.$disconnect();
  }
};
