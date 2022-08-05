import { PrismaClient } from "@prisma/client";
import yn from "yn";

const prisma = new PrismaClient();

const noteController = async (params) => {
  console.log(
    new Date().toUTCString() +
      " controllers/noteController.js -> params = " +
      JSON.stringify(params)
  );

  switch (params.action) {
    case "findAll":
      return findAll(params);
    case "create":
      return create(params);
    case "update":
      return update(params);
    case "deleteById":
      return deleteById(params.id);
    case "archive":
      return archive(params);
    default:
      return methodDoesNotExist();
  }
};

const handleException = (method, message) => {
  const errorMessage =
    new Date().toUTCString() +
    " controllers/noteController.js -> Exception in method " +
    method +
    ": " +
    message;
  console.log(errorMessage);

  return {
    status: 500,
    success: false,
    data: [],
    errorMessage: errorMessage,
  };
};

const methodDoesNotExist = () => {
  const errorMessage =
    new Date().toUTCString() +
    " controllers/noteController.js -> the action requested does not exist";
  console.log(errorMessage);

  return {
    status: 400,
    success: false,
    data: [],
    errorMessage: errorMessage,
  };
};

//* ----- Methods -----

const findAll = async (params) => {
  try {
    const data = await prisma.Notes.findMany({
      where: {
        archived: {
          equals: yn(params.archived),
        },
      },
    });

    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleException("findAll", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const create = async (params) => {
  try {
    const data = await prisma.Notes.create({
      data: {
        title: params.title,
        content: params.content,
      },
    });

    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleException("create", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const update = async (params) => {
  try {
    const data = await prisma.Notes.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: params.title,
        content: params.content,
      },
    });
    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleException("update", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const deleteById = async (id) => {
  try {
    const data = await prisma.Notes.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleException("deleteById", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const archive = async (params) => {
  try {
    const data = await prisma.Notes.update({
      where: {
        id: Number(params.id),
      },
      data: {
        archived: yn(params.archived),
      },
    });
    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleException("archive", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

export default noteController;