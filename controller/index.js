const service = require("../services");
const logger = require('../logger')

module.exports.mastersUpsert = async (req, res) => {
  try {

    await service.mastersUpsert(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.userMastersUpsert = async (req, res) => {
  try {

    await service.userMastersUpsert(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getMasterData = async (req, res) => {
  try {
    await service.getMasterData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.saveLeadGenerationData = async (req, res) => {
  try {
    await service.saveLeadGenerationData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.updateLeadData = async (req, res) => {
  try {
    await service.updateLeadData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.assignLeads = async (req, res) => {
  try {
    await service.assignLeads(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getFilteredLeadData = async (req, res) => {
  try {
    req.body.searchKey = '', req.body.locationkey = '', req.body.platformId = 0
    await service.getLeadData(req, res)
  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }
};

module.exports.getAdvancedLeadData = async (req, res) => {
  try {
    req.body = { leadId: 0, userId: 0, statusId: 0, ...req.body }
    await service.getLeadData(req, res)
  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }
};


module.exports.upsertCatalogue = async (req, res) => {
  try {
    await service.upsertCatalogue(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getCatalogue = async (req, res) => {
  try {
    await service.getCatalogue(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.saveQuotation = async (req, res) => {
  try {
    await service.saveQuotation(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getQuotationData = async (req, res) => {
  try {
    await service.getQuotationData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.saveInvoiceData = async (req, res) => {
  try {
    await service.saveInvoiceData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getInvoiceData = async (req, res) => {
  try {
    await service.getInvoiceData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.updateProductInstalment = async (req, res) => {
  try {
    await service.updateProductInstalment(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getDashboardData = async (req, res) => {
  try {
    await service.getDashboardData(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};


const sendResponse = (req, res, data, length) => {
  if (data.length > 0) {
    res.status(200).send({ "timeStamp": new Date(), message: "Records found", "data": data, 'count': length || data.length })
    return
  } else {
    res.status(400).send({ "timeStamp": new Date(), message: "No Record(s) Found" })
    return
  }
}

module.exports.validateRequest = (req, res, next) => {
  let bodyData = req.body;

  if (typeof (bodyData) === 'object' && Object.keys(bodyData).length !== 0) {
    let keys = Object.keys(bodyData[0]);
    let reqStatus = true;
    for (let i = 0; i < columns.length; i++) {
      if (!keys.includes(columns[i])) {
        console.log(true)
        res.status(400).send({ message: "Invalid request" })
        reqStatus = false;
        break;
        //next({ message: "Invalid request" })
      }
    }
    if (reqStatus) {
      next()
    }
  } else {
    res.status(400).send({ message: "Invalid request" })
    //next({ message: "Invalid request" })
  }

}

const columns = ["name", "mobileNo", "emailId", "streetName", "cityName", "stateName", "zipCode", "countryName",
  "intrestedIn", "sourceId", "assignId", "label", "createdBy"]