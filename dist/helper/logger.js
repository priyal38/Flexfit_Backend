"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const CATEGORY = "custom format";
const logger = winston_1.default.createLogger({
    level: "debug",
    // format: combine(
    //   label({ label: CATEGORY }),
    //   timestamp({
    //     format: "MMM-DD-YYYY HH:mm:ss",
    //   }),
    //   prettyPrint()
    // ),
    format: winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.colorize({ all: true })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: "logs/example.log",
        }),
        new winston_1.transports.File({
            level: "error",
            filename: "logs/error.log",
        }),
    ],
});
exports.default = logger;
