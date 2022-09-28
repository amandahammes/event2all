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
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const checkJwt = (req, res, next) => {
    var _a, _b;
    const token = req.headers["auth"];
    let jwtPayLoad;
    try {
        jwtPayLoad = jwt.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        res.locals.jwtPayload = jwtPayLoad;
    }
    catch (error) {
        return res.status(401).send();
    }
    ;
    const { id, email } = jwtPayLoad;
    const newToken = jwt.sign({ id, email }, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "", {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    next();
};
exports.checkJwt = checkJwt;
