//https://www.youtube.com/watch?v=3vJlXzhtxx4&ab_channel=AlexRusin

import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const getLogger = (fileName = "log") => {
  const fileLogTransport = new transports.DailyRotateFile({
    filename: `logs/${fileName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    //maxFiles: '30d'
  });

  const consoleTransport = new transports.Console({
    //level: process.env.LOG_LEVEL,
    handleExceptions: false,
    json: false,
    colorize: true,
    //format: format.printf((i)=>`${i.message}`)
  });

  const logger = createLogger({
    level: "info",

    format: format.combine(
      format.simple(),
      format.timestamp(),
      format.errors({ stack: true }),
      format.printf(
        (info) =>
          `${info.timestamp} - ${info.level.toUpperCase().padEnd(7)}: ${
            info.message
          }`
      )
    ),

    transports: [fileLogTransport, consoleTransport],
  });

  //logger.add(fileLogTransport)

  return logger;
};

export default getLogger();
