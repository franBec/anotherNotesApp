import { prisma } from "../db";
import yn from "yn";

import {
  handleStatus400,
  handleStatus401,
  handleStatus403,
  handleStatus404,
  handleStatus500,
} from "../services/api/handleStatusXXX";

const fileName = "controllers/noteController";

export const findAll = async (params) => {
  try {
    const paramsError = await checkParams(params, "findAll");
    if (paramsError) return paramsError;

    const data = await prisma.Note.findMany({
      where: {
        archived: {
          equals: yn(params.archived),
        },
        userId: Number(params.currentUserId),
      },
    });

    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleStatus500(fileName + ".findAll()", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const create = async (params) => {
  try {
    const paramsError = await checkParams(params, "create");
    if (paramsError) return paramsError;

    const data = await prisma.Note.create({
      data: {
        title: params.title,
        content: params.content,
        userId: Number(params.currentUserId),
      },
    });

    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleStatus500(fileName + ".create()", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const update = async (params) => {
  try {
    const paramsError = await checkParams(params, "update");
    if (paramsError) return paramsError;

    //update note
    const data = await prisma.Note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: params.title,
        content: params.content,
        modified: new Date(),
      },
    });
    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleStatus500(fileName + ".update()", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteById = async (params) => {
  try {
    const paramsError = await checkParams(params, "deleteById");
    if (paramsError) return paramsError;

    //delete note
    const data = await prisma.Note.delete({
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
    return handleStatus500(fileName + ".deleteById()", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const archive = async (params) => {
  try {
    const paramsError = await checkParams(params, "archive");
    if (paramsError) return paramsError;

    //archive note
    const data = await prisma.Note.update({
      where: {
        id: Number(id),
      },
      data: {
        archived: yn(params.archived),
        modified: new Date(),
      },
    });
    return {
      status: 200,
      success: true,
      data: data,
      errorMessage: null,
    };
  } catch (error) {
    return handleStatus500(fileName + ".archive()", error);
  } finally {
    await prisma.$disconnect();
  }
};

const checkParams = async (params, foo) => {
  //check for status 401: there no current user id
  if (!Number(params.currentUserId)) {
    return handleStatus401(
      `${fileName}.${foo}()`,
      "current user id is missing"
    );
  }

  if (["create", "update"].includes(foo)) {
    //check for status 400: params.title is required
    if (!params.title?.trim()?.length) {
      return handleStatus400(
        `${fileName}.${foo}()`,
        "title is required and must not be empty"
      );
    }
  }

  if (["update", "deleteById", "archive"].includes(foo)) {
    //check for status 400: params.id is required and must be a number
    if (!Number(params.id)) {
      return handleStatus400(
        `${fileName}.${foo}()`,
        "id is required and must be a number"
      );
    }

    const note = await prisma.Note.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    //check for status 404: note might not exist
    if (!note) {
      return handleStatus404(
        `${fileName}.${foo}()`,
        `note #${params.id} does not exist`
      );
    }

    //check for status 403: the note does not belong to the current user
    if (note.userId !== Number(params.currentUserId)) {
      return handleStatus403(
        `${fileName}.${foo}()`,
        "the note trying to be accessed does not belong to the current user"
      );
    }
  }

  return null;
};
