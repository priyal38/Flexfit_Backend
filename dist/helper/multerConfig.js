"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Destination folder 
    },
    filename: (req, file, cb) => {
        ;
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
// Multer upload instance
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|jfif|/;
        const mimeTypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path_1.default.extname(file.originalname));
        if (mimeTypes && extname) {
            return cb(null, true);
        }
    }
});
exports.upload = upload;
