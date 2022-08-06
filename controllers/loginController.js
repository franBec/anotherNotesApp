import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loginController = async (mail, password) => {
  try {
    //look for a user with provided mail
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });

    //if not user
    if (!user) {
      return 401;
    }

    //if not valid password
    if (user.password !== password) {
      return 401;
    }

    //all ok!
    return 200;
  } catch (error) {
    console.error(error.message);
    return 500;
  }
};

export default loginController;
