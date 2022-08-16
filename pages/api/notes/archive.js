import { archive } from "../../../controllers/noteController";
import { getCurrentUser_id } from "../../../services/auth/getCurrentUser";

import {
  handleStatus401,
  handleStatus405,
  handleStatus500,
} from "../../../services/api/handleStatusXXX";

const fileName = "api/notes/archive.js";
const expectedMethod = "PUT";

export default async function handler(req, res) {
  try {
    //check for status 405
    if (req.method !== expectedMethod)
      return res
        .status(405)
        .json(handleStatus405(fileName, expectedMethod, req.method));

    //get current user information
    const cookiename = process.env.COOKIENAME;
    const cookie = req.cookies[cookiename];
    const { currentUserId, message } = await getCurrentUser_id(cookie);

    //check for status 401
    if (!currentUserId)
      return res.status(401).json(handleStatus401(fileName, message));

    //set params
    const params = req.body;

    //add current user id to params, so controller can use it
    params.currentUserId = currentUserId;

    //everything's ok! go to controller
    const results = await archive(params);

    //return what controller did
    return res.status(results.status).json(results);
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error));
  }
}
