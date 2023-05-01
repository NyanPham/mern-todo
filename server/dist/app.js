"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/*@ts-ignore */
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
const meRouter_1 = __importDefault(require("./routes/meRouter"));
const app = (0, express_1.default)();
// Security configuration
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http:localhost:3000'
}));
app.options('*', (0, cors_1.default)({
    origin: 'http:localhost:3000'
}));
const limiter = (0, express_rate_limit_1.default)({
    max: 300,
    windowMs: 60 * 24 * 60 * 1000,
    message: "You have reached the access quota limit of 300. Please wait for quota to reset"
});
app.use(limiter);
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// Data transfer congiruation
app.use(body_parser_1.default.json({
    limit: '30kbs'
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
// Route dispatcher
app.use('/api/v1/users', userRouter_1.default);
app.use('/api/v1/auth', authRouter_1.default);
app.use('/api/v1/me', meRouter_1.default);
app.use('/api/v1/tasks', taskRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map