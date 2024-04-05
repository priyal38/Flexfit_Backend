"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../utils/schema"));
const mongoose_1 = require("mongoose");
const validationOptions = {
    abortEarly: false, //collect all err ony stop on first err
    allowUnknown: false, //unknown keys (keys not defined in the schema) as errors.
};
const schemaValidator = (path) => {
    const schema = schema_1.default[path];
    if (!schema) {
        throw new mongoose_1.Error(`Schema not found for path: ${path}`);
    }
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, validationOptions);
        if (error) {
            return res.status(422).send(error.details.map((err) => err.message));
        }
        // validation successful
        req.body = value;
        return next();
    };
};
exports.default = schemaValidator;
