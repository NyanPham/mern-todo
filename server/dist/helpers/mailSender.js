"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async ({ from, to, subject, message, html, headers }) => {
    const options = {
        from,
        to,
        subject,
        text: message
    };
    const transporter = nodemailer_1.default.createTransport({
        //@ts-ignore
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD
        },
    });
    const info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.response);
};
exports.default = sendMail;
//# sourceMappingURL=mailSender.js.map