import { signUp } from "../../../controllers/signupController";

import {
  handleStatus405,
  handleStatus500,
} from "../../../services/api/handleStatusXXX";

const fileName = "api/signup/index.js";
const expectedMethod = "POST";

export default async function handler(req, res) {
  try {
    //check for status 405
    if (req.method !== expectedMethod)
      return res
        .status(405)
        .json(handleStatus405(fileName, expectedMethod, req.method));

    //everything's ok! go to controller
    const results = await signUp(req.body);
    return res.status(results.status).json(results);
  } catch (error) {
    return res.status(500).json(handleStatus500(fileName, error));
  }
}
