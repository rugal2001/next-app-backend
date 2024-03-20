"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.updateUser = exports.getUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const secretKey = "123456";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const users = yield user_1.UserModel.find();
        const userCheck = yield users.find((u) => u.email === email);
        if (userCheck) {
            res.status(400).json({ message: "this email is already used" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
        const user = new user_1.UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });
        yield user.save();
        res.status(201).json({ message: "user created successfully" });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const users = yield user_1.UserModel.find();
    const user = yield users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).send("No User Found");
    }
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send("Invalid data");
    }
    const token = jwt.sign({ userId: user.email }, secretKey, {
        expiresIn: "24h",
    });
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    res.status(200).json({ access_token: token });
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield user_1.UserModel.findOne({
            email: req.user.userId,
        });
        if (!profile) {
            return res.status(400).send("there is no profile for this user");
        }
        res.status(200).send(profile);
    }
    catch (error) {
        res.status(401).json({ message: "error message !" });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { image } = req.body;
        const { firstName } = req.body;
        const { lastName } = req.body;
        const { email } = req.body;
        const { role } = req.body;
        const user = yield user_1.UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "user Not found" });
        }
        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.role = role;
            if (image) {
                user.image = image;
            }
            yield user.save();
            return res.status(201).json({ message: "user updated succeffully" });
        }
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: "There is an issue in update user method" });
    }
});
exports.updateUser = updateUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.UserModel.findById(id);
        if (!user) {
            return res.status(400).send(`there is no user with the id=${id}`);
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(401).json({ message: "error message !" });
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=UserController.js.map