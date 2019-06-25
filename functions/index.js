const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.submitContactForm = functions.region('europe-west1').https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== "POST") {
            return;
        }

        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;

        const errors = [];

        if (!name || !name.length) {
            errors.push({ field: 'name', message: 'REQUIRED' });
        }
        if (!email || !email.length) {
            errors.push({ field: 'email', message: 'REQUIRED' });
        }
        if (!subject || !subject.length) {
            errors.push({ field: 'subject', message: 'REQUIRED' });
        }
        if (!message || !message.length) {
            errors.push({ field: 'message', message: 'REQUIRED' });
        }

        if (errors.length) {
            res.status(400).send(errors);
            return;
        }

        const mailOptions = {
            from: email,
            replyTo: email,
            to: 'khalil@kelyo.fr',
            subject: `[kelyo.fr Contact] - ${subject}`,
            text: message,
            html: `<p><strong>De : </strong> ${name} (${email})</p>
                <p><strong>Sujet : </strong> ${subject}</p>
                <p><strong>Message : </strong> ${message}</p>`
        };

        mailTransport.sendMail(mailOptions);

        res.status(200).end();
        // or you can pass data to indicate success.
        // res.status(200).send({isEmailSend: true});
    });
});
