"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenResponse = exports.unauthorizedResponse = exports.serverErrorWithData = exports.validationErrorWithData = exports.AlreadyExists = exports.notFoundResponse = exports.errorResponseWithData = exports.errorResponse = exports.successResponseWithData = exports.sendToken = exports.successResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const successResponse = (res, msg) => {
    const data = {
        status: 1,
        code: 200,
        message: msg,
    };
    return res.status(200).json(data);
};
exports.successResponse = successResponse;
const sendToken = (res, statusCode, user) => {
    const token = jsonwebtoken_1.default.sign({ id: user._id }, "S2k3c0efrsfdsdsdfff2dsasdfd", {
        expiresIn: '1d',
    });
    res.status(statusCode).json({
        message: 'success',
        statusCode,
        token,
        user,
    });
};
exports.sendToken = sendToken;
const successResponseWithData = (res, msg, data) => {
    const resData = {
        status: 1,
        code: 200,
        message: msg,
        data: data,
    };
    return res.status(200).json(resData);
};
exports.successResponseWithData = successResponseWithData;
const errorResponse = (res, msg) => {
    const data = {
        status: 0,
        code: 500,
        message: msg,
    };
    return res.status(500).json(data);
};
exports.errorResponse = errorResponse;
const errorResponseWithData = (res, msg, data) => {
    const errorData = {
        status: 0,
        code: 500,
        message: msg,
        data: data
    };
    return res.status(500).json(errorData);
};
exports.errorResponseWithData = errorResponseWithData;
const notFoundResponse = (res, msg) => {
    const data = {
        status: 0,
        code: 404,
        message: msg,
    };
    return res.status(404).json(data);
};
exports.notFoundResponse = notFoundResponse;
const AlreadyExists = (res, msg) => {
    const data = {
        status: 0,
        code: 409,
        message: msg,
    };
    return res.status(409).json(data);
};
exports.AlreadyExists = AlreadyExists;
const validationErrorWithData = (res, msg, data) => {
    const resData = {
        status: 0,
        code: 400,
        message: msg,
        data: data,
    };
    return res.status(400).json(resData);
};
exports.validationErrorWithData = validationErrorWithData;
const serverErrorWithData = (res, msg, data) => {
    const resData = {
        status: 0,
        code: 500,
        message: msg,
        data: data,
    };
    return res.status(500).json(resData);
};
exports.serverErrorWithData = serverErrorWithData;
const unauthorizedResponse = (res, msg) => {
    const data = {
        status: 0,
        message: msg,
        code: 401,
    };
    return res.status(401).json(data);
};
exports.unauthorizedResponse = unauthorizedResponse;
const forbiddenResponse = (res, msg = 'Forbidden') => {
    const data = {
        code: 403,
        status: 0,
        message: msg,
    };
    return res.status(403).json(data);
};
exports.forbiddenResponse = forbiddenResponse;
