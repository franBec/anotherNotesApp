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
      return { data: null, status: 401 };
    }

    //if not valid password
    if (user.password !== password) {
      return { data: null, status: 401 };
    }

    //all ok!
    return { data: { id: user.id, name: user.firstName }, status: 200 };
  } catch (error) {
    logger.error(error.message);
    return { data: null, status: 500 };
  } finally {
    await prisma.$disconnect();
  }
};

export default loginController;
