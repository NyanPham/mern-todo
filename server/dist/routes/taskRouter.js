"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.use(authController_1.protect);
//@ts-ignore
router.use((0, authController_1.restrictTo)('admin'));
router.route('/').get(taskController_1.getAllTasks).post(taskController_1.createTask);
router.route('/:id').get(taskController_1.getTask).patch(taskController_1.updateTask).delete(taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRouter.js.map