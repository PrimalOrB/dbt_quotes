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

    let emailRecipient
    switch ( type ){
      case 'New':
        emailRecipient = 'engineering@deboertool.com'
        // emailRecipient = 'aogilvie@deboertool.com'
        break
      case 'Finished':
        emailRecipient = 'specials@deboertool.com'
        // emailRecipient = 'aogilvie@deboertool.com'
        break
      case 'Unarchived':
        emailRecipient = 'engineering@deboertool.com'
        // emailRecipient = 'aogilvie@deboertool.com'
        break
      case 'Material':
        emailRecipient = 'mdavidson@deboertool.com'
        // emailRecipient = 'aogilvie@deboertool.com'
        break
      default:
        emailRecipient = 'specials@deboertool.com'
        // emailRecipient = 'aogilvie@deboertool.com'
        break
    }

    var mailOptions = {
      from: process.env.EMAIL_ACCOUNT,
      to: emailRecipient,
      subject: `Quote Tracker - ${ type } Quote: ${ data.customerName.toUpperCase() }${ data.jNum && ` - J${data.jNum}` }`,
      generateTextFromHTML: true,
      html: `
      <b>${ type } Quote Tracker Task:</b> ${ data.customerName.toUpperCase() }${ data.jNum && ` - J${data.jNum}` }<br/>
      ${ type === 'Material' ? `<p><b>Material Status:</b> ${ data.statusMtl }</p>` : '' }
      ${ data.description !== null ? `<p><b>Description:</b> ${ data.description }</p>` : '' }
      ${ data.priority > 0 ? `<p><b>Priority:</b> ${ data.priority } / 5</p>` : '' }
      ${ data.additionalNotes !== '' ? `<p><b>Additional Notes:</b> ${ data.additionalNotes }</p>` : '' }
      ${ data.status !== null ? `<p><b>Task Status:</b> ${ data.status }</p>` : '' }
      ${ data.PODate > 0 ? `<p><b>PO Received Date:</b> ${ new Date(data.PODate).toLocaleDateString() } ${ data.POQty && `for ${ data.POQty }pc` }</p>` : ''}    
      ${ data.pcsURL !== '' ? `<br/><a href="${ data.pcsURL }"><b>PCS Quote Link</b></a>` : '' }
      ${ data.crmURL !== '' ? `<br/><a href="${ data.crmURL }"><b>CRM Opportunity Link</b></a>` : '' }
      ${ data.mtlURL !== '' ? `<br/><a href="${ data.mtlURL }"><b>Material Purchase Order Link</b></a>` : '' }
      ${ `<br/><a href="https://dbt-quotes.herokuapp.com/quote/${quote._id}"><b>Quote Tracker Link</b></a>` }
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
