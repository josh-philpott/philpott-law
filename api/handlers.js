import { getEmailBodyHtml, getEmailBodyText } from "./strings.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  "Mr. P-P-P-PH-P-PHHHH-PHH-P-Phil... MR PHILPOTT",
  "What is up with your bad self",
  "This is Josh, your AI son, here with another contact form submission",
  "Hey! I found this outside",
];

export const handleSubmitContactForm = function (request, response) {
  const {
    grecap,
    recipients,
    name,
    email,
    phone,
    city,
    state,
    issue,
    contact,
  } = request.body;
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  console.dir(request.body);

  if (!grecap || grecap === "") {
    response.status(500).send("Failed authentication");
    console.error("Failed authentication");
    return;
  }

  let contactString = "";
  if (!contact) {
    contactString = "No Preference";
  } else if (Array.isArray(contact)) {
    contactString = contact.join(" or ");
  } else {
    contactString = contact;
  }

  if (process.env.ENABLE_CONTACT_FORM_EMAILS !== "false") {
    const msg = {
      to: recipients.split(","),
      from: {
        email: "josh@philpott.io",
        name: "Josh Philpott",
      },
      subject: "Contact Form Submission - philpott-law.com",
      html: getEmailBodyHtml(
        greeting,
        name,
        city,
        state,
        contactString,
        email,
        phone,
        issue
      ),
      text: getEmailBodyText(
        greeting,
        name,
        city,
        state,
        contactString,
        email,
        phone,
        issue
      ),
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email Sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log("Success!");
  response.redirect(request.body.good_url);
};

async function checkCaptcha(captcha_response, ip) {
  const data = {
    secret: process.env.RECAPTCHA_SECRET,
    response: captcha_response,
    remoteip: ip,
  };

  const googleResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify?" +
      new URLSearchParams(data),
    {
      method: "post",
    }
  );

  const response = await googleResponse.json();
  return response.success;
}

export const handleCheckCaptcha = async function (request, response) {
  const success = await checkCaptcha(
    request.body.g_recaptcha_response,
    request.headers["x-forwarded-for"] || request.socket.remoteAddress
  );

  if (success) {
    response.send("true");
  } else {
    response.send("false");
  }
};
