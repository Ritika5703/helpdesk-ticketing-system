import transporter from "./transporter.js";

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: `"Helpdesk Support" <${process.env.SENDER_EMAIL}>`, // ✅ from .env
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
