"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (func) => async (req, res, next) => {
    try {
        await func(req, res);
    }
    catch (error) {
        next(error);
    }
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map