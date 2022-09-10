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

router.get('/api/getBrands', logRequest, async (req, res) => {
  await controller.get(req, res, 'getBrands')
})


module.exports = router;
