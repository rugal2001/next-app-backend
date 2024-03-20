"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function to authenticate requests
const authenticateUser = (req, res, next) => {
    var _a;
    // Extract the JWT token from the Authorization header
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
    }
    // Verify the token
    jsonwebtoken_1.default.verify(token, "123456", (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid token" });
        }
        // If token is valid, attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map