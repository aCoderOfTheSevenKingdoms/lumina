import nodemailer from "nodemailer";

/**
 * A tranporter instance must be created using the nodemailer library. 
 * The transporter is the one that helps the communication between our web server and SMTP server. 
 * SMTP server is the one that actually sends the email to an email address. 
 * Mandatory requirements for SMT server: user, client id, client secret, refresh token
*/
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
});

transporter.verify()
  .then(() => {console.log("Email transporter is ready to send email")})
  .catch((err) => {console.log("Email transporter verification failed: ", err)}); 

export async function sendEmail({to, subject, html, text}){
    const mailOptions = {
        from: process.env.GOOGLE_USER, 
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", details);
}  