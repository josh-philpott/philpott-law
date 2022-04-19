import fetch from 'node-fetch'
import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config';
import sgMail from '@sendgrid/mail';
import { getEmailBodyHtml, getEmailBodyText } from './strings.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://philpott-law.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

async function checkCaptcha(captcha_response, ip) {
    const data = {
        secret: process.env.RECAPTCHA_SECRET,
        response: captcha_response,
        remoteip: ip
    }

    const googleResponse = await fetch('https://www.google.com/recaptcha/api/siteverify?' + new URLSearchParams(
        data
    ), {
        method: 'post'
    });

    const response = await googleResponse.json();
    return response.success
}

let greetings = [
    "What's up Danny P",
    "Sup Pops",
    "Yo yo yo Mr. Philpott",
    "Barister Philpott",
    "Hey Daddio",
    "What's Happenin Pops",
    "Howdy Howdy",
    "Hola Señor Philpott",
    "¿Cómo estás? Señor Philpott",
    "Sir Philpott",
    "Dearest Mr. Philpott",
    "Mr. P-P-P-PH-P-PHHHH-PHH-P-Phil... MR PHILPOTT"
]
app.post('/contact-submit', urlencodedParser, async function (request, response) {
    const { name, email, phone, city, state, issue, contact, grecap } = request.body
    const isTest = (name === "TEST");

    console.dir(request.body)

    // If it's not a test, check the captcha
    if (!isTest) {
        console.log(grecap)
        const success = await checkCaptcha(grecap, request.headers['x-forwarded-for'] || request.socket.remoteAddress)
        if (!success) {
            return response.status(422).send('Captcha failed...');
        }
    }

    // Get the contact preference string
    let contactString = "";
    if (!contact) {
        contactString = "No Preference";
    } else if (Array.isArray(contact)) {
        contactString = contact.join(' or ');
    } else {
        contactString = contact;
    }

    if (process.env.ENABLE_CONTACT_FORM_EMAILS !== 'false' && !isTest) {
        console.log(`Sending contact form response from ${name}`)
        const greeting = greetings[Math.floor(Math.random() * greetings.length)]
        const msg = {
            to: ['danny@philpott-law.com', 'josh@philpott.io'],
            from: {
                email: 'josh@philpott.io',
                name: 'Josh Philpott'
            },
            subject: `Contact Form Submission - ${name} - ${new Date().toDateString()}`,
            text: getEmailBodyText(greeting, name, city, state, contactString, email, phone, issue),
            html: getEmailBodyHtml(greeting, name, city, state, contactString, email, phone, issue)
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email Sent!')
            })
            .catch((error) => {
                console.error(error)
            })
    } else {
        console.log(`Skipping email send`)
    }

    response.redirect(request.body.good_url)
})

app.post('/check-captcha', urlencodedParser, async function (request, response) {

    const success = await checkCaptcha(request.body.g_recaptcha_response, request.headers['x-forwarded-for'] || request.socket.remoteAddress)

    if (success) {
        response.send('true');
    } else {
        response.send('false');
    }

})

const port = process.env.NODE_PORT || 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)