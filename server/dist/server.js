"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// setup environment
dotenv_1.default.config({ path: './.env.local' });
const dbString = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(dbString)
    .then((res) => {
    console.log('Database is connected successfully!');
    const PORT = process.env.PORT || 3001;
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
})
    .catch((error) => console.log('Failed to connect to the database'));
// run server
//# sourceMappingURL=server.js.map