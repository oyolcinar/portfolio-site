import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: 'oyolcinar@gmail.com',
      from: 'oyolcinar@gmail.com',
      subject: `${req.body.subject}`,
      html: `<div> 
      <h3>You've got a new mail from  ✉️${req.body.email} </h3>
      <div style="font-size: 16px;">
      <p>Message:</p>
      <p>${req.body.message}</p></div>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '' });
}

export default sendEmail;
