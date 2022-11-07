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

router.post('/api/upsertCatalogue', logRequest, async (req, res) => {
  await controller.upsertCatalogue(req, res)
})

router.post('/api/getCatalogue', logRequest, async (req, res) => {
  await controller.getCatalogue(req, res)
})

router.post('/api/saveQuotation', logRequest, async (req, res) => {
  await controller.saveQuotation(req, res)
})

router.post('/api/getQuotationData', logRequest, async (req, res) => {
  await controller.getQuotationData(req, res)
})

router.post('/api/saveInvoice', logRequest, async (req, res) => {
  await controller.saveInvoiceData(req, res)
})

router.post('/api/getInvoiceData', logRequest, async (req, res) => {
  await controller.getInvoiceData(req, res)
})

router.post('/api/updateProductInstalment', logRequest, async (req, res) => {
  await controller.updateProductInstalment(req, res)
})

router.post('/api/getDashboardData', logRequest, async (req, res) => {
  await controller.getDashboardData(req, res)
})

router.post('/api/userLogin', logRequest, async (req, res) => {
  await controller.login(req, res)
})

module.exports = router;
