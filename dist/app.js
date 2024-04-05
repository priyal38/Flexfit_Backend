"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
// import dotenv from "dotenv";
const db_1 = __importDefault(require("./db"));
const index_1 = __importDefault(require("./routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/uploads', express_1.default.static('./uploads'));
app.use('/', index_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
