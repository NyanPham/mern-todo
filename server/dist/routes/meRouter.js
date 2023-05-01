"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const meController_1 = require("../controllers/meController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.route('/myTasks').get(meController_1.getMyTasks).post(meController_1.createMyTask);
router.route('/myTasks/:id').get(meController_1.getMyTask).patch(meController_1.updateMyTask).delete(meController_1.deleteMyTask);
router.delete('/myAccount', meController_1.deactivateMyAccount);
exports.default = router;
//# sourceMappingURL=meRouter.js.map