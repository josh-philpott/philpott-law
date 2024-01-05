import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { handleSubmitContactForm } from "./handlers.js";

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});

/**
 * Enable CORS from https://philpott-law.com
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://philpott-law.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * Handle contact form submission
 */
app.post(
  "/contact-submit",
  urlencodedParser,
  async function (request, response) {
    handleSubmitContactForm(request, response);
  }
);

/**
 * Handle captcha check
 */
app.post(
  "/check-captcha",
  urlencodedParser,
  async function (request, response) {
    handleCheckCaptcha(request, response);
  }
);

app.get("/health", function (request, response) {
  response.send("OK");
});

// Start the server
const port = process.env.NODE_PORT || 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
