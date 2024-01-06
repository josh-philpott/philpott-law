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

function main(event, context) {
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
  } = event;

  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

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
  return {
    headers: { location: event.good_url },
    statusCode: 302,
  };
}
