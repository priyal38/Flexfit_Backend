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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponse = __importStar(require("../helper/apiResponse"));
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return apiResponse.errorResponse(res, "Authorization header is missing");
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return apiResponse.errorResponse(res, "Token is missing");
        }
        jsonwebtoken_1.default.verify(token, "S2k3c0efrsfdsdsdfff2dsasdfd", (err, decoded) => {
            if (err) {
                return apiResponse.unauthorizedResponse(res, "Token is not valid");
            }
            req.user = decoded.id;
            next();
        });
    }
    catch (error) {
        return apiResponse.errorResponse(res, "Internal server error");
    }
};
exports.default = verifyToken;
