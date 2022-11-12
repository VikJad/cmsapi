const router = require("express").Router();
const controller = require("../controller");
const logger = require('../logger')
const validate = require('../models')
const auth = require('../utils/auth')

const logRequest = (req, res, next) => {
  try {
    logger.info(JSON.stringify(req.body))
    next()
  } catch (error) {
    next(error)
  }

}


router.post('/api/mastersUpsert', auth, logRequest, async (req, res) => {
  await controller.mastersUpsert(req, res)
})

router.post('/api/userMasterUpsert', auth, logRequest, async (req, res) => {
  await controller.userMastersUpsert(req, res)
})

router.get('/api/getMasterData', auth, logRequest, async (req, res) => {
  await controller.getMasterData(req, res)
})

router.post('/api/saveLeadGenerationData', auth, logRequest, controller.validateRequest, async (req, res) => {
  await controller.saveLeadGenerationData(req, res)
})

router.post('/api/updateLeadData', auth, logRequest, async (req, res) => {
  await controller.updateLeadData(req, res)
})

router.post('/api/assignLeads', auth, logRequest, async (req, res) => {
  await controller.assignLeads(req, res)
})

router.post('/api/getFilteredLeadData', auth, logRequest, async (req, res) => {
  await controller.getFilteredLeadData(req, res)
})

router.post('/api/getAdvancedLeadData', auth, logRequest, async (req, res) => {
  await controller.getAdvancedLeadData(req, res)
})

router.post('/api/upsertCatalogue', auth, logRequest, async (req, res) => {
  await controller.upsertCatalogue(req, res)
})

router.post('/api/getCatalogue', auth, logRequest, async (req, res) => {
  await controller.getCatalogue(req, res)
})

router.post('/api/saveQuotation', auth, logRequest, async (req, res) => {
  await controller.saveQuotation(req, res)
})

router.post('/api/getQuotationData', auth, logRequest, async (req, res) => {
  await controller.getQuotationData(req, res)
})

router.post('/api/saveInvoice', auth, logRequest, async (req, res) => {
  await controller.saveInvoiceData(req, res)
})

router.post('/api/getInvoiceData', auth, logRequest, async (req, res) => {
  await controller.getInvoiceData(req, res)
})

router.post('/api/updateProductInstalment', auth, logRequest, async (req, res) => {
  await controller.updateProductInstalment(req, res)
})

router.post('/api/getDashboardData', auth, logRequest, async (req, res) => {
  await controller.getDashboardData(req, res)
})

router.post('/api/userLogin', logRequest, async (req, res) => {
  await controller.login(req, res)
})

router.post('/api/saveLeadFollowups', auth, logRequest, async (req, res) => {
  await controller.saveFollowups(req, res)
})

router.post('/api/saveLeadMeetings', auth, logRequest, async (req, res) => {
  await controller.saveMeetings(req, res)
})

module.exports = router;
