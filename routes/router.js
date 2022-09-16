const router = require("express").Router();
const controller = require("../controller");
const logger = require('../logger')
const validate = require('../models')

const logRequest = (req, res, next) => {
  try {
    logger.info(JSON.stringify(req.body))
    next()
  } catch (error) {
    next(error)
  }

}


router.post('/api/mastersUpsert', logRequest, async (req, res) => {
  await controller.mastersUpsert(req, res)
})

router.post('/api/userMasterUpsert', logRequest, async (req, res) => {
  await controller.userMastersUpsert(req, res)
})

router.get('/api/getMasterData', logRequest, async (req, res) => {
  await controller.getMasterData(req, res)
})

router.post('/api/saveLeadGenerationData', logRequest, controller.validateRequest, async (req, res) => {
  await controller.saveLeadGenerationData(req, res)
})

router.post('/api/updateLeadData', logRequest, async (req, res) => {
  await controller.updateLeadData(req, res)
})

router.post('/api/assignLeads', logRequest, async (req, res) => {
  await controller.assignLeads(req, res)
})

router.post('/api/getFilteredLeadData', logRequest, async (req, res) => {
  await controller.getFilteredLeadData(req, res)
})

router.post('/api/getAdvancedLeadData', logRequest, async (req, res) => {
  await controller.getAdvancedLeadData(req, res)
})

module.exports = router;
