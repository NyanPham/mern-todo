'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.deactivateMyAccount =
    exports.deleteMyTask =
    exports.updateMyTask =
    exports.getMyTask =
    exports.createMyTask =
    exports.getMyTasks =
        void 0
const User_1 = __importDefault(require('../models/User'))
const Task_1 = __importDefault(require('../models/Task'))
const catchAsync_1 = __importDefault(require('../helpers/catchAsync'))
exports.getMyTasks = (0, catchAsync_1.default)(async (req, res) => {
    const tasks = await Task_1.default.find({
        userId: req.currentUser._id,
    })
    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            data: tasks,
        },
    })
})
exports.createMyTask = (0, catchAsync_1.default)(async (req, res) => {
    const taskToCreate = {
        ...req.body,
        userId: req.currentUser._id,
    }
    const task = await Task_1.default.create(taskToCreate)
    res.status(201).json({
        status: 'success',
        data: {
            data: task,
        },
    })
})
exports.getMyTask = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params
    const task = await Task_1.default.findOne({
        _id: id,
        userId: req.currentUser._id,
    })
    if (task == null) throw new AppError('No task found!')
    res.status(200).json({
        status: 'success',
        data: {
            data: task,
        },
    })
})
exports.updateMyTask = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params
    const taskToUpdate = { ...req.body }
    if (taskToUpdate.userId != null) {
        delete taskToUpdate.userId
    }

    const updatedTask = await Task_1.default.findOneAndUpdate(
        {
            _id: id,
            userId: req.currentUser._id,
        },
        taskToUpdate,
        {
            runValidators: true,
            new: true,
        }
    )
    res.status(200).json({
        status: 'success',
        data: {
            data: updatedTask,
        },
    })
})
exports.deleteMyTask = (0, catchAsync_1.default)(async (req, res) => {
    await Task_1.default.findOneAndDelete({
        _id: req.params.id,
        userId: req.currentUser._id,
    })
    res.status(204).json({
        status: 'success',
        data: null,
    })
})
exports.deactivateMyAccount = (0, catchAsync_1.default)(async (req, res) => {
    await User_1.default.findByIdAndUpdate(
        req.currentUser._id,
        {
            active: false,
        },
        {
            runValidators: true,
            new: true,
        }
    )
    res.status(204).json({
        status: 'success',
        data: null,
    })
})
//# sourceMappingURL=meController.js.map
