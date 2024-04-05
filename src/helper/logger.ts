import winston, { format, createLogger, transport, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "custom format";

const logger = winston.createLogger({
  level: "debug",

  // format: combine(
    
  //   label({ label: CATEGORY }),
  //   timestamp({
  //     format: "MMM-DD-YYYY HH:mm:ss",
  //   }),
  //   prettyPrint()
  // ),
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all :true})
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/example.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
});

export default logger;
