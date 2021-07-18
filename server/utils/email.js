require( 'dotenv' ).config();
var nodemailer = require('nodemailer');

module.exports = {
  sendEmail: function(data, type, quote) {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
            type: "OAUTH2",
            user: process.env.EMAIL_ACCOUNT,  //set these in your .env file
            clientId: process.env.EMAIL_CLIENT,
            clientSecret: process.env.EMAIL_SECRET,
            refreshToken: process.env.EMAIL_REFRESH,
            accessToken: process.env.EMAIL_ACCESS,
            expires: 3599
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL_ACCOUNT,
      to: "primalorb@gmail.com",
      subject: `Quote Tracker - ${ type } Quote: ${ data.customerName.toUpperCase() }${ data.jNum && ` - J${data.jNum}` }`,
      generateTextFromHTML: true,
      html: `
      <b>${ type } Quote Tracker Task:</b> ${ data.customerName.toUpperCase() }${ data.jNum && ` - J${data.jNum}` }<br/>
      ${ data.description !== null ? `<p><b>Description:</b> ${ data.description }</p>` : '' }
      ${ data.priority !== null ? `<p><b>Priority:</b> ${ data.priority } / 5</p>` : '' }
      ${ data.additionalNotes !== null ? `<p><b>Additional Notes:</b> ${ data.additionalNotes }</p>` : '' }
      ${ data.status !== null ? `<p><b>Task Status:</b> ${ data.status }</p>` : '' }
      ${ data.PODate !== null ? `<p><b>PO Received Date:</b> ${ new Date(data.PODate).toLocaleDateString() } ${ data.POQty && `for ${ data.POQty }pc` }</p>` : ''}    
      ${ data.pcsURL !== null ? `<br/><a href="${ data.pcsURL }"><b>PCS Quote Link</b></a>` : '' }
      ${ data.crmURL !== null ? `<br/><a href="${ data.crmURL }"><b>CRM Opportunity Link</b></a>` : '' }
      ${ `<br/><a href="http://localhost:3000/quote/${quote._id}"><b>Quote Tracker Link</b></a>` }
      `
    };
    
    transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
      transporter.close();
    });
  }
}
