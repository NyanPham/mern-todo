"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getOne = exports.createOne = exports.getAll = void 0;
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
const getAll = (Model, filterOptions = {}) => (0, catchAsync_1.default)(async (req, res) => {
    const data = await Model.find(filterOptions);
    res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
            data
        }
    });
});
exports.getAll = getAll;
const createOne = (Model, options) => (0, catchAsync_1.default)(async (req, res) => {
    let content = { ...req.body };
    if (options && options.isAuthBased && options.field) {
        content = {
            ...content,
            [options.field]: req.currentUser._id
        };
    }
    const data = await Model.create(content);
    res.status(201).json({
        status: 'success',
        data: {
            data
        }
    });
});
exports.createOne = createOne;
const getOne = (Model, populateOptions) => (0, catchAsync_1.default)(async (req, res) => {
    //@ts-ignore
    const { id } = req.params;
    const query = Model.findById(id);
    if (populateOptions) {
        query.populate(populateOptions);
    }
    const data = await query.exec();
    if (data == null)
        throw new Error(`${Model} is not defined`);
    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    });
});
exports.getOne = getOne;
const updateOne = (Model, unallowedFields) => (0, catchAsync_1.default)(async (req, res) => {
    const content = { ...req.body };
    const contentKeys = Object.keys(content);
    if (unallowedFields && unallowedFields.some(field => contentKeys.includes(field))) {
        throw new Error(`Fields of ${unallowedFields.join(', ')} cannot be updated`);
    }
    // @ts-ignore
    const { id } = req.params;
    const updatedData = await Model.findByIdAndUpdate(id, content, {
        runValidators: true,
        new: true,
    });
    if (updatedData == null)
        throw new Error(`Failed to update ${Model}`);
    res.status(200).json({
        status: 'success',
        data: {
            data: updatedData
        }
    });
});
exports.updateOne = updateOne;
const deleteOne = (Model) => (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
exports.deleteOne = deleteOne;
//# sourceMappingURL=factoryController.js.map