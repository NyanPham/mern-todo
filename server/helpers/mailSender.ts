import nodemailer from 'nodemailer'

export interface IMailerOptions {
    from: string,
    to: string,
    subject: string,
    message: string,
    html?: string, 
    headers?: object
}

const sendMail = async ({
    from,
    to,
    subject,
    message,
    html,
    headers
}  : IMailerOptions) => {

    const options = {
        from, 
        to, 
        subject,
        text: message
    }   

    const transporter = nodemailer.createTransport({
        //@ts-ignore
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        auth: { 
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD
        },
    })

    const info = await transporter.sendMail(options)
    console.log("Message sent: %s", info.response);
}

export default sendMail