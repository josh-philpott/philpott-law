export async function main(event, context) {
  const success = await checkCaptcha(
    request.body.g_recaptcha_response,
    request.headers["x-forwarded-for"] || request.socket.remoteAddress
  );

  let response = success ? "true" : "false";
  return { body: response };
}

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
