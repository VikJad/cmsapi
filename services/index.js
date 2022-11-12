`use strict`
const dbOps = require('../utils/dbOps')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/dev.json')

module.exports.mastersUpsert = async (req, res) => {
  const body = req.body;

  const params = [body.masterName, body.id, body.inputText, body.recodStatus, body.addedBy, body.modifiedBy, body.platformIcon, body.platformColor]
  const dbResponse = await dbOps.crud('usp_masterUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.userMastersUpsert = async (req, res) => {
  const body = req.body;
  body.password = await hashPassword(req.body.password)
  const params = [body.id, body.firstName, body.lastName, body.email, body.lastActive, body.userRoleId, body.createdBy, body.updatedBy, body.password, body.mobileNo,
  body.alternateMobileNo, body.userName, body.recodStatus]
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
  const params = [opType, bodyData.catId, bodyData.catType, bodyData.price, bodyData.description, bodyData.catStatus, bodyData.actionBy, bodyData.gsName]
  const dbResponse = await dbOps.crud('usp_poductcatalogue_crud', params)
  sendResponse(dbResponse, res)
};

module.exports.getCatalogue = async (req, res) => {
  const bodyData = req.body;
  let params = [3, bodyData.catId, '', 0, '', 0, 0, ''];
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
  sendResponse(dbResponse, res)
};

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
  console.log(bodyData)
  const params = [bodyData]
  const dbResponse = await dbOps.crud('usp_invoice_save', JSON.stringify(params))
  sendResponse(dbResponse, res)
};

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
  let params = [];
  for (let i of Object.keys(bodyData)) {
    params.push(bodyData[i])
  }
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
  console.log(dbResponse[0][0])
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

      res.status(200).send({ message: "User Logged in Successfully!", 'accessToken': token })
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