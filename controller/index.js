const service = require("../services");
const logger = require('../logger')

module.exports.mastersUpsert = async (req, res) => {
  try {

    const data = await service.mastersUpsert(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.userMastersUpsert = async (req, res) => {
  try {

    const data = await service.userMastersUpsert(req, res)

  } catch (error) {
    console.log(error)
    logger.error(error.toString())
    res.status(500).send({ message: 'something went wrong' })
  }

};

module.exports.getMasterData = async (req, res) => {
  try {
    const data = await service.getMasterData(req, res)

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