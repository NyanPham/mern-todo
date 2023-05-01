"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const factoryController_1 = require("./factoryController");
exports.getAllTasks = (0, factoryController_1.getAll)(Task_1.default);
exports.createTask = (0, factoryController_1.createOne)(Task_1.default, { isAuthBased: true, field: 'userId' });
exports.getTask = (0, factoryController_1.getOne)(Task_1.default);
exports.updateTask = (0, factoryController_1.updateOne)(Task_1.default);
exports.deleteTask = (0, factoryController_1.deleteOne)(Task_1.default);
//# sourceMappingURL=taskController.js.map