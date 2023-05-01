"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.patch('/updatePassword', authController_1.protect, authController_1.updatePassword);
router.post('/forgotPassword', authController_1.forgotPassword);
router.patch('/resetPassword/:resetToken', authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRouter.js.map