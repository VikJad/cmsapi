const router = require("express").Router();
const controller = require("../controller");
const logger = require('../logger')
const validate = require('../models')
const auth = require('../utils/auth')
const multer = require("multer");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const crypto = require("crypto");

const logRequest = (req, res, next) => {
  try {
    logger.info(JSON.stringify(req.body))
    next()
  } catch (error) {
    next(error)
  }

}

let file_name;

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.includes("pdf")) {
    cb(null, true);
  } else {
    cb("Please upload only pdf file.", false);
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.originalUrl)
    let endpoint = req.originalUrl.split('/')
    endpoint = endpoint[endpoint.length - 1]
    if (endpoint === 'sendQuotationMail') {
      endpoint = 'quotation';
    } else {
      endpoint = 'invoice';
    }
    cb(null, path.resolve(appDir, `uploads/${endpoint}`));
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    file_name = `${crypto.randomBytes(16).toString("hex")}.${file.originalname.split(".")[1]
      }`;
    //console.log(fileName);
    cb(null, file_name);
  },
});

const upload = multer({ storage: storage, fileFilter: pdfFilter });


router.post('/api/mastersUpsert', auth, logRequest, async (req, res) => {
  await controller.mastersUpsert(req, res)
})

router.post('/api/userMasterUpsert', auth, logRequest, async (req, res) => {
  await controller.userMastersUpsert(req, res)
})

router.post('/api/specialUserInsert', logRequest, async (req, res) => {
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

router.post('/api/getQuotationData', auth, logRequest,  async (req, res) => {

  await controller.getQuotationData(req, res)
})

router.post('/api/sendQuotationMail', auth, logRequest, upload.single("file"), async (req, res) => {
  req.fileName = file_name;
  await controller.sendQuotationMail(req, res)
})

router.post('/api/saveInvoice', auth, logRequest, async (req, res) => {
  await controller.saveInvoiceData(req, res)
})

router.post('/api/sendInvoiceMail', auth, logRequest, upload.single("file"), async (req, res) => {
  req.fileName = file_name;
  await controller.sendInvoiceMail(req, res)
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

router.post('/api/digitalCardUpsert', auth, logRequest, async (req, res) => {
  await controller.digitalCardUpsert(req, res)
})

router.post('/api/getDigitalCard', auth, logRequest, async (req, res) => {
  await controller.getDigitalCard(req, res)
})

router.post('/api/saveCompanyMaster', auth, logRequest, async (req, res) => {
  await controller.saveCompanyMaster(req, res)
})

router.post('/api/updateCompanyMaster', auth, logRequest, async (req, res) => {
  await controller.updateCompanyMaster(req, res)
})

router.post('/api/updateCompanyAccounts', auth, logRequest, async (req, res) => {
  await controller.updateCompanyAccounts(req, res)
})

router.post('/api/getCompanyMaster', auth, logRequest, async (req, res) => {
  await controller.getCompanyMaster(req, res)
})

router.get('/api/getLeadStatusCount', auth, logRequest, async (req, res) => {
  await controller.getLeadStatusCount(req, res)
})

router.post('/api/getPendingInstalments', auth, logRequest, async (req, res) => {
  await controller.getPendingInstalments(req, res)
})

router.post('/api/getRenewalInstalments', auth, logRequest, async (req, res) => {
  await controller.getRenewalInstalments(req, res)
})

router.post('/api/sendReminderMail', auth, logRequest, async (req, res) => {
  await controller.sendReminderMail(req, res)
})

module.exports = router;
