"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const factoryController_1 = require("./factoryController");
exports.getAllUsers = (0, factoryController_1.getAll)(User_1.default);
exports.createUser = (0, factoryController_1.createOne)(User_1.default);
exports.getUser = (0, factoryController_1.getOne)(User_1.default, { path: 'tasks', select: '-__v' });
exports.updateUser = (0, factoryController_1.updateOne)(User_1.default, ['role', 'password', 'passwordConfirm']);
exports.deleteUser = (0, factoryController_1.deleteOne)(User_1.default);
//# sourceMappingURL=userController.js.map