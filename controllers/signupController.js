import { prisma } from "../db";

import {
  handleStatus200,
  handleStatus400,
  handleStatus500,
} from "../services/api/handleStatusXXX";

const fileName = "controllers/signupController";

export const signUp = async (form) => {
  try {
    //look for a user with provided mail
    const user = await prisma.user.findUnique({
      where: {
        mail: form.mail,
      },
    });

    //mail already registered
    if (user) {
      return handleStatus400(fileName, "Mail already registered");
    }

    //delete the repeated password from the form, it is no needed from this point on
    delete form.repeatPassword;

    const createUser = await prisma.user.create({
      data: form,
    });

    return handleStatus200();
  } catch (error) {
    handleStatus500(fileName, error);
  } finally {
    await prisma.$disconnect();
  }
};
