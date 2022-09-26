"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const checkToken = (req, res, next) => {
    const token = req.headers["auth"];
    if (!token) {
        return res.status(401).send("Not logged.");
    }
    next();
};
exports.checkToken = checkToken;
