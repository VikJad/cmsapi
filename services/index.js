`use strict`
const dbOps = require('../utils/dbOps')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/dev.json')
const nodemailer = require('nodemailer')
const path = require("path");
const appDir = path.dirname(require.main.filename);
const fs = require('fs')
const mailUtil = require('../utils/mail')

module.exports.mastersUpsert = async (req, res) => {
  const body = req.body;
  body.addedBy = req.headers['userid']
  body.modifiedBy = req.headers['userid']
  const params = [body.masterName, body.id, body.inputText, body.recodStatus, body.addedBy, body.modifiedBy, body.platformIcon, body.platformColor]
  const dbResponse = await dbOps.crud('usp_masterUpsert', params)
  console.log(dbResponse)
  sendResponse(dbResponse, res)
};

module.exports.userMastersUpsert = async (req, res) => {
  const body = req.body;
  body.password = await hashPassword(req.body.password)
  body.createdBy = req.headers['userid']
  body.updatedBy = req.headers['userid']
  const params = [body.id, body.firstName, body.lastName, body.email, body.lastActive, body.userRoleId, body.createdBy, body.updatedBy, body.password, body.mobileNo,
  body.alternateMobileNo, body.userName, body.recodStatus, body.branchId, body.tlId, body.branchManagerId]
  const dbResponse = await dbOps.crud('usp_userMasterUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.getMasterData = async (req, res) => {
  const params = [req.query.masterName]
  const dbResponse = await dbOps.crud('usp_getMasterData', params)
  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }
};

// module.exports.userMastersUpsert = async (req, res) => {
//   const body = req.body;
//   const params = [body.id, body.firstName, body.lastName, body.email, body.lastActive, body.roleId, body.createdBy, body.updatedBy, ]
//   const dbResponse = await dbOps.crud('usp_userMasterUpsert', params)
//   sendResponse(dbResponse, res)
// };

module.exports.saveLeadGenerationData = async (req, res) => {
  const jsonData = req.body;
  console.log(JSON.stringify(jsonData))
  //req.headers['userid']
  const dbResponse = await dbOps.crud('usp_saveLeadGenerationData', JSON.stringify(jsonData))

  sendResponse(dbResponse, res)
};

module.exports.updateLeadData = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_updateLeadData', params)
  sendResponse(dbResponse, res)
};

module.exports.assignLeads = async (req, res) => {
  const bodyData = req.body;
  bodyData.actionBy = req.headers['userid']
  const params = [bodyData.source_id, bodyData.leadCount, bodyData.assignedUserId, bodyData.actionBy]
  const dbResponse = await dbOps.crud('usp_assignLeads', params)
  sendResponse(dbResponse, res)
};

module.exports.getLeadData = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getLeadData', params);

  if (dbResponse[0].length > 0) {
    let responseData = dbResponse[0][0];
    // console.log(responseData)
    if (bodyData.leadId !== 0) {
      responseData = responseData.map(x => ({ ...x, followupData: dbResponse[0][1], meetingData: dbResponse[0][2] }));
      //responseData = [...responseData, ...dbResponse[0][1], ...dbResponse[0][2]];
    }

    res.status(200).send({ message: "Record found!", data: responseData, timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }
};

module.exports.upsertCatalogue = async (req, res) => {
  const bodyData = req.body;
  const opType = bodyData.catId === 0 ? 1 : 2
  bodyData.actionBy = req.headers['userid']
  const params = [opType, bodyData.catId, bodyData.catType, bodyData.price, bodyData.description, bodyData.catStatus, bodyData.actionBy, bodyData.gsName, bodyData.durationId]
  const dbResponse = await dbOps.crud('usp_poductcatalogue_crud', params)
  sendResponse(dbResponse, res)
};

module.exports.getCatalogue = async (req, res) => {
  const bodyData = req.body;
  let params = [3, bodyData.catId, '', 0, '', 0, 0, '', 0];
  const dbResponse = await dbOps.crud('usp_poductcatalogue_crud', params)
  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }
};

module.exports.saveQuotation = async (req, res) => {
  const bodyData = req.body;
  console.log(bodyData)
  const params = [bodyData]
  const dbResponse = await dbOps.crud('usp_quotation_save', JSON.stringify(params))
  if (dbResponse[0][0].length > 0) {
    res.status(201).send({ message: `Quotation Created : ${dbResponse[0][0][0].quotationNumber}`, data: dbResponse[0][0], timeStamp: new Date() })

  } else {
    res.status(500).send({ message: "Quotation not saved", timeStamp: new Date() })
  }


};

module.exports.sendQuotationMail = async (req, res) => {
  const bodyData = JSON.parse(req.body.data);
  fs.renameSync(path.resolve(appDir, `uploads/quotation/${req.fileName}`), path.resolve(appDir, `uploads/quotation/${bodyData.quotationNumber}.pdf`))

  return sendMail(bodyData.quotationNumber, bodyData.clientEmail, bodyData.emailTemplateId)

  //res.status(200).send({ message: `Mail sent : ${bodyData.quotationNumber}`, timeStamp: new Date() })
}

module.exports.getQuotationData = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getQuotationData', params)

  if (dbResponse[0].length > 0) {
    let allData = dbResponse[0][0].map(x => ({ ...x, instalments: dbResponse[0][1].filter(l => l.parentId === x.id) }))
    res.status(200).send({ message: "Record found!", data: allData, timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};


module.exports.saveInvoiceData = async (req, res) => {
  const bodyData = req.body;
  // console.log(bodyData)
  const params = [bodyData]
  const dbResponse = await dbOps.crud('usp_invoice_save', JSON.stringify(params))
  if (dbResponse[0][0].length > 0) {
    // fs.renameSync(path.resolve(appDir, `uploads/invoice/${req.fileName}`), path.resolve(appDir, `uploads/invoice/${dbResponse[0][0][0].invoiceNumber}.pdf`))

    // sendInvoiceMail(dbResponse[0][0][0].invoiceNumber, bodyData.clientEmail, req.fileName)

    res.status(201).send({ message: `invoice Created : ${dbResponse[0][0][0].invoiceNumber}`, data: dbResponse[0][0], timeStamp: new Date() })

  } else {
    res.status(500).send({ message: "invoice not saved", timeStamp: new Date() })
  }
};

module.exports.sendInvoiceMail = async (req, res) => {
  const bodyData = JSON.parse(req.body.data);
  fs.renameSync(path.resolve(appDir, `uploads/invoice/${req.fileName}`), path.resolve(appDir, `uploads/invoice/${bodyData.invoiceNumber}.pdf`))

  sendInvoiceMail(bodyData.invoiceNumber, bodyData.clientEmail, bodyData.emailTemplateId)

  res.status(200).send({ message: `Mail sent : ${bodyData.invoiceNumber}`, timeStamp: new Date() })
}

module.exports.getInvoiceData = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getInvoiceData', params)

  if (dbResponse[0].length > 0) {
    let allData = dbResponse[0][0].map(x => ({ ...x, instalments: dbResponse[0][1].filter(l => l.parentId === x.id) }))
    res.status(200).send({ message: "Record found!", data: allData, timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.updateProductInstalment = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_updateProductInstalment', params)
  sendResponse(dbResponse, res)
};

module.exports.getDashboardData = async (req, res) => {
  const bodyData = req.body;
  bodyData.empId = req.headers['userid']
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  params.push(req.headers['rolecode'])
  const dbResponse = await dbOps.crud('usp_getDashboardData', params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.login = async (req, res) => {
  const bodyData = req.body;
  let params = [bodyData.userName];

  const dbResponse = await dbOps.crud('usp_getUserPassword', params);
  console.log(dbResponse[0][0][1])
  if (dbResponse[0][0].length > 0) {
    const validUser = await bcrypt.compare(req.body.password, dbResponse[0][0][0].password);
    if (validUser) {
      const token = jwt.sign(
        { userName: bodyData.userName },
        config.secretKey,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).send({
        message: "User Logged in Successfully!",
        'accessToken': token, roleName: dbResponse[0][0][0].roleName, userName: dbResponse[0][0][0].userName,
        roleCode: dbResponse[0][0][0].roleCode, userId: dbResponse[0][0][0].userId
      })
    } else {
      res.status(401).send({ message: "Unauthorized User!" })
    }
  } else {
    res.status(200).send({ message: "Invalid User Details" })
  }
}

module.exports.saveFollowups = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_saveLeadFollowups', params)
  sendResponse(dbResponse, res)
};

module.exports.saveMeetings = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_saveLeadMeetings', params)
  sendResponse(dbResponse, res)
};

module.exports.updateProductInstalment = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_updateProductInstalment', params)
  sendResponse(dbResponse, res)
};

module.exports.digitalCardUpsert = async (req, res) => {
  const bodyData = req.body;
  const params = [bodyData._id, bodyData.name, bodyData.profileRole, bodyData.mobileNo1, bodyData.mobileNo2, bodyData.email,
  bodyData.address, bodyData.recordStatus, bodyData.lastActive, bodyData.createdBy, bodyData.updatedBy, bodyData.dob, bodyData.gender]
  const dbResponse = await dbOps.crud('usp_digitalCardUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.getDigitalCard = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getDigitalCard', params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.saveCompanyMaster = async (req, res) => {
  const bodyData = req.body;
  // console.log(bodyData)
  const params = [bodyData]
  const dbResponse = await dbOps.crud('usp_saveCompanyMaster', JSON.stringify(params))
  console.log(dbResponse)
  if (dbResponse[0].affectedRows > 0) {
    sendResponse(dbResponse, res)
  } else {
    res.status(500).send({ message: "Record not saved", timeStamp: new Date() })
  }
};

module.exports.updateCompanyMaster = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_updateCompanyMaster', params)
  sendResponse(dbResponse, res)
};

module.exports.updateCompanyAccounts = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_updateCompanyAccounts', params)
  sendResponse(dbResponse, res)
};

module.exports.getCompanyMaster = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getCompanyMaster', params)

  if (dbResponse[0].length > 0) {
    let allData = dbResponse[0][0].map(x => ({ ...x, accounts: dbResponse[0][1].filter(l => l.companyId === x.id) }))
    res.status(200).send({ message: "Record found!", data: allData, timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.getLeadStatusCount = async (req, res) => {
  const bodyData = req.body;
  bodyData.empId = req.headers['userid']
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  params.push(req.headers['rolecode'])

  const dbResponse = await dbOps.crud('usp_getLeadStatusCount', params)

  if (dbResponse[0][0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.getPendingInstalments = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getPendingInstalments', params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.getRenewalInstalments = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getRenewalInstalments', params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }


};

module.exports.sendReminderMail = async (req, res) => {
  mailUtil.sendReminderMail(req, res)
}

module.exports.saveLeadRenewalData = async (req, res) => {
  const bodyData = req.body;
  // console.log(bodyData)
  const params = bodyData
  const dbResponse = await dbOps.crud('usp_leadRenewal', JSON.stringify(params))
  if (dbResponse[0][0].length > 0) {
    res.status(201).send({ message: `invoice Created : ${dbResponse[0][0][0].invoiceNumber}`, data: dbResponse[0][0], timeStamp: new Date() })

  } else {
    res.status(500).send({ message: "invoice not saved", timeStamp: new Date() })
  }
};

module.exports.updateQuotationInvoice = async (req, res) => {
  const bodyData = req.body;
  // console.log(bodyData)
  const params = bodyData
  const dbResponse = await dbOps.crud('usp_updateQuotationInvoiceStatus', params)
  //sendResponse(dbResponse, res)
  // console.log(dbResponse)
  // if (dbResponse[0][0].length > 0) {
  //   res.status(200).send({ message: `Data updated successfully`, timeStamp: new Date() })
  // } else {
  //   res.status(500).send({ message: "data not updated", timeStamp: new Date() })
  // }
};

module.exports.updateUserPassword = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  bodyData.userPassword = await hashPassword(bodyData.userPassword)

  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  params.push('')
  const dbResponse = await dbOps.crud('usp_updateUserPassword', params)

  sendResponse(dbResponse, res)
};

module.exports.assignBulkLeads = async (req, res) => {
  let params = [];
  const bodyData = req.body;
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_assignBulkLeads', params)

  sendResponse(dbResponse, res)
}

module.exports.getLeadsByEmployee = async (req, res) => {
  let params = [];
  const bodyData = req.body;
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getLeadsByEmployee', params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }
}

module.exports.transferLeads = async (req, res) => {
  let params = [];
  const bodyData = req.body;
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_transferLeads', params)

  sendResponse(dbResponse, res)
}

module.exports.getAdvancedDashboardData = async (req, res, spName) => {
  const bodyData = req.body;
  bodyData.empId = req.headers['userid']
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  params.push(req.headers['rolecode'])
  const dbResponse = await dbOps.crud(spName, params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }

};

module.exports.getEmailTemplate = async (req, res) => {
  let params = [];
  params.push(req.query._id ? req.query._id : 0)
  //params.push(req.headers['rolecode'])
  const dbResponse = await dbOps.crud('usp_getEmailTemplate', params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }

};



module.exports.emailTemplateUpsert = async (req, res) => {
  const bodyData = req.body;
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  params.push(req.headers['userid']);
  const dbResponse = await dbOps.crud('usp_emailTemplateUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.getEmailTemplates = async (req, res, spName) => {
  const bodyData = req.body;
  bodyData.empId = req.headers['userid']
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
  params.push(req.headers['rolecode'])
  const dbResponse = await dbOps.crud(spName, params)

  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStamp: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStamp: new Date() })
  }

};














const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const sendResponse = (dbResponse, res) => {
  if (dbResponse[0].affectedRows > 0) {
    res.status(201).send({ message: "Record saved successfully!" })
  } else {
    res.status(500).send({ message: "Something went wrong" })
  }
  return
}

const sendMail = async (quotationNumber, userEmail, emailTemplateId) => {

  //let emailData = `This is quotation email. Quotation Number ${quotationNumber}`
   let emailData = await dbOps.crud('usp_getEmailTemplate', [emailTemplateId])
   console.log(emailData[0])
   let emailSubject = emailData[0][0][0].emailSubject;
   emailData = emailData[0][0][0].emailBody;
  console.log(emailData)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'com.mailutil@gmail.com',
      pass: 'wfbjlggujydbgyme'
    }
  });
  const fileLocation = path.resolve(appDir, `uploads/quotation/${quotationNumber}.pdf`);
  const mailOptions = {
    from: 'The Idea project',
    to: userEmail,
    subject: emailSubject,
    html: emailData,
    attachments: [
      {   // use URL as an attachment
        filename: `${quotationNumber}.pdf`,
        path: fileLocation
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('mail sent')
    }
  })
  //res.send('mail sent')
}


const sendInvoiceMail = async (invoiceNumber, userEmail, emailTemplateId) => {

  // let emailData = `This is invoice email. Invoice Number ${invoiceNumber}`
  console.log(emailTemplateId)
  let emailData = await dbOps.crud('usp_getEmailTemplate', [emailTemplateId])

console.log(emailData)

  let emailSubject = emailData[0][0][0].emailSubject;
  emailData = emailData[0][0][0].emailBody;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'com.mailutil@gmail.com',
      pass: 'wfbjlggujydbgyme'
    }
  });
  const fileLocation = path.resolve(appDir, `uploads/invoice/${invoiceNumber}.pdf`);
  const mailOptions = {
    from: 'The Idea project',
    to: userEmail,
    subject: emailSubject,
    html: emailData,
    attachments: [
      {   // use URL as an attachment
        filename: `${invoiceNumber}.pdf`,
        path: fileLocation
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('mail sent')
    }
  })
  //res.send('mail sent')
}


module.exports.resetUserPassword = async (req, res) => {

  let randomPassword = Math.random().toString(36).slice(2)
  let params = [];
  params.push(0)
  params.push(await hashPassword(randomPassword))
  params.push(req.query.userEmail)
  const dbResponse = await dbOps.crud('usp_updateUserPassword', params)

  if (dbResponse[0].affectedRows > 0) {
    let emailData = `Please use system generated password : ${randomPassword}`


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'com.mailutil@gmail.com',
        pass: 'wfbjlggujydbgyme'
      }
    });
    const mailOptions = {
      from: 'The Idea project',
      to: req.query.userEmail,
      subject: 'CRM Password Reset!!',
      html: emailData,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('mail sent')
      }
    })
    res.status(200).send({ message: 'Password reset successful, Please check the email' })
  } else {
    res.status(500).send({ message: "Something went wrong" })
  }
}