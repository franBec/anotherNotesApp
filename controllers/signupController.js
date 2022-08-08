import { prisma } from "../db";
import logger from "../services/logger";

const signupController = async (form) => {
  logger.info(
    "controllers/signupController -> form: " + JSON.stringify(form, null, 2)
  );
  try {
    //look for a user with provided mail
    const user = await prisma.user.findUnique({
      where: {
        mail: form.mail,
      },
    });

    //mail already registered
    if (user) {
      return { errorMessage: "Mail already registered", status: 400 };
    }

    //delete the repeated password from the form, it is no needed from this point on
    delete form.repeatPassword;

    const createUser = await prisma.user.create({
      data: form,
    });

    return { errorMessage: null, status: 200 };
  } catch (error) {
    logger.error(error.message);
    return { errorMessage: error.message, status: 500 };
  } finally {
    await prisma.$disconnect();
  }
};

export default signupController;
