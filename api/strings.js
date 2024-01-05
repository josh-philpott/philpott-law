export const getEmailBodyHtml = (
  greeting,
  name,
  city,
  state,
  contactString,
  email,
  phone,
  issue
) => `
<h2>${greeting},</h2>

<p>You got a new contact form submission!</p>

<b>Name:</b> ${name} <br/>
<b>City:</b> ${city} <br/>
<b>State:</b> ${state} <br/>
<b>Contact Preference:</b> ${contactString} <br/>
<b>Email:</b> <a href="mailto:${email}">${email}</a> <br/>
<b>Phone:</b> ${phone} <br/>

<h2> They Said: </h2>
<p><em>${issue}</em></p>`;

export const getEmailBodyText = (
  greeting,
  name,
  city,
  state,
  contactString,
  email,
  phone,
  issue
) => `
${greeting}

You got a new contact form submission!

Name: ${name}
City: ${city}
State: ${state}
Contact Preference: ${contactString}
Email: ${email}
Phone: ${phone}

They said:
${issue}`;
