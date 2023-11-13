const nodeMailer = require("nodemailer");
const html = `
<h1>Hello</h1>
<p>Thank you for filling the survey</p>
`;

const sendEmail = async (req, res) => {
  const email = req.query.email;
  let testAccount = await nodeMailer.createTestAccount();
  const transporter = nodeMailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Temiloluwa Adeleye"  <adeleyetemiloluwa674@gmail.com>',
    to: `${email}`,
    subject: "OR Stretch: Baseline Survey",
    text: `Hello, ${email}`,
    html: `<p>Here is the link to the baseline survey:</p>`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("here");
      return res.status(201).json({ message: "Email sent", isSuccess: true });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: err, isSuccess: false });
    });
};

module.exports = { sendEmail };
