`use strict`
const dbOps = require('../utils/dbOps')

module.exports.mastersUpsert = async (req, res) => {
  const body = req.body;
  const params = [body.masterName, body.id, body.inputText, body.recodStatus, body.addedBy, body.modifiedBy]
  const dbResponse = await dbOps.crud('usp_masterUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.userMastersUpsert = async (req, res) => {
  const body = req.body;
  const params = [body.id, body.firstName, body.lastName, body.email, body.lastActive, body.roleId, body.createdBy, body.updatedBy]
  const dbResponse = await dbOps.crud('usp_userMasterUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.getMasterData = async (req, res) => {
  const params = [req.query.masterName]
  const dbResponse = await dbOps.crud('usp_getMasterData', params)
  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStame: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStame: new Date() })
  }
};

module.exports.userMastersUpsert = async (req, res) => {
  const body = req.body;
  const params = [body.id, body.firstName, body.lastName, body.email, body.lastActive, body.roleId, body.createdBy, body.updatedBy]
  const dbResponse = await dbOps.crud('usp_userMasterUpsert', params)
  sendResponse(dbResponse, res)
};

module.exports.saveLeadGenerationData = async (req, res) => {
  const jsonData = req.body;
  console.log(JSON.stringify(jsonData))
  const dbResponse = await dbOps.crud('usp_saveLeadGenerationData', JSON.stringify(jsonData))
  
  sendResponse(dbResponse, res)
};

module.exports.updateLeadData = async (req, res) => {
  const bodyData = req.body;
  const params = [bodyData.leadId, bodyData.remark, bodyData.statusId, bodyData.actionBy]
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
  for(let i of Object.keys(bodyData)){
    params.push(bodyData[i])
  }
  const dbResponse = await dbOps.crud('usp_getLeadData', params)
  if (dbResponse[0].length > 0) {
    res.status(200).send({ message: "Record found!", data: dbResponse[0][0], timeStame: new Date() })
  } else {
    res.status(400).send({ message: "No Record found!", timeStame: new Date() })
  }
};

const sendResponse = (dbResponse, res) => {
  if (dbResponse[0].affectedRows > 0) {
    res.status(201).send({ message: "Record saved successfully!" })
  } else {
    res.status(500).send({ message: "Something went wrong" })
  }
  return
}