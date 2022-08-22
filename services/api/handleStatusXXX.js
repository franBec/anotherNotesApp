import logger from "../logger";

export function handleStatus200(data = null, metadata = null) {
  return {
    status: 200,
    success: true,
    data: data,
    metadata: metadata,
  };
}

export function handleStatus400(fileName, message) {
  const errorMessage = `${fileName} -> error 400 bad request: ${message}`;
  logger.info(errorMessage);
  return {
    status: 400,
    success: false,
    errorMessage: errorMessage,
  };
}

export function handleStatus401(fileName, message) {
  const errorMessage = `${fileName} -> error 401 unauthorized: ${message}`;
  logger.info(errorMessage);
  return {
    status: 401,
    success: false,
    errorMessage: errorMessage,
  };
}

export function handleStatus403(fileName, message) {
  const errorMessage = `${fileName} -> error 403 forbidden: ${message}`;
  logger.info(errorMessage);
  return {
    status: 403,
    success: false,
    errorMessage: errorMessage,
  };
}

export function handleStatus404(fileName, message) {
  const errorMessage = `${fileName} -> error 404 not found: ${message}`;
  logger.info(errorMessage);
  return {
    status: 404,
    success: false,
    errorMessage: errorMessage,
  };
}

export function handleStatus405(fileName, expectedMethod, foundMethod) {
  const errorMessage = `${fileName} -> error 405 bad method: expected ${expectedMethod}, found ${foundMethod}`;
  logger.info(errorMessage);
  return {
    status: 405,
    success: false,
    errorMessage: errorMessage,
  };
}

export function handleStatus500(fileName, error) {
  const errorMessage =
    fileName + " -> error 500 internal server error: " + error;
  logger.error(errorMessage);
  return {
    status: 500,
    success: false,
    errorMessage: errorMessage,
  };
}
