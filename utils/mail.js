const nodemailer = require('nodemailer')

module.exports.sendReminderMail = (req, res) => {

    let emailData = `This is invoice email. Invoice Number`


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'com.mailutil@gmail.com',
            pass: 'wfbjlggujydbgyme'
        }
    });

    const mailOptions = {
        from: 'The Idea project',
        to: req.body.emailId,
        subject: 'Instalment Reminder',
        html: getReminderMailBody(req)
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('mail sent')
        }
    })

    res.status(200).send({ message: 'mail sent' })
}

const getReminderMailBody = (req) => {
    return `
    <head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>
<table>
  <tr>
    <th>Invoice No</th>
    <th>Item Name</th>
    <th>Instalment Date</th>
    <th>Amount</th>
  </tr>
  
  <tr>
    <td>${req.body.invoiceNo}</td>
    <td>${req.body.itemName}</td>
    <td>${req.body.date}</td>
    <td>${req.body.amount}</td>
  </tr>
</table>

</body>
    `


    }