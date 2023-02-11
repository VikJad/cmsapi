module.exports.validateMaster = (req, res, next) => {
    if (req.body.masterName === null || req.body.masterName === '') {
        console.log(true)
        return res.status(400).send({ 'message': "masterName required" })
        next(0)
    }
    if (req.body.inputText === null || req.body.inputText === '') {
        return res.status(400).send({ 'message': "inputText required" })
        next(0)
    }
    next()

}

module.exports.validateUser = (req, res, next) => {
    if (req.body.firstName === null || req.body.firstName === '') {
        return res.status(400).send({ 'message': "firstName required" })
        next(0)
    }
    if (req.body.lastName === null || req.body.lastName === '') {
        return res.status(400).send({ 'message': "lastName required" })
        next(0)
    }
    if (req.body.mobileNo === null || req.body.mobileNo === '') {
        return res.status(400).send({ 'message': "mobileNo required" })
        next(0)
    }
    if (req.body.email === null || req.body.email === '') {
        return res.status(400).send({ 'message': "email required" })
        next(0)
    }
    if (req.body.userRoleId === null || req.body.userRoleId === 0) {
        return res.status(400).send({ 'message': "userRoleId required" })
        next(0)
    }
    if (req.body.userName === null || req.body.userName === '') {
        return res.status(400).send({ 'message': "userName required" })
        next(0)
    }
    if (req.body.password === null || req.body.password === '') {
        return res.status(400).send({ 'message': "password required" })
        next(0)
    }
    next()

}

module.exports.validateLead = async (req, res, next) => {
    if (req.body.length === 0) {
        return res.status(400).send({ 'message': "Data not available for insert" })
    }

    for await (let i of req.body) {
        if (i.name === null || i.name === '') {
            i.message = "name required"

            return res.status(400).send(i)
            next(0)
        }

        if (i.mobileNo === null || i.mobileNo === '') {
            i.message = "mobileNo required"
            return res.status(400).send(i)
            next(0)
        }
        if (i.emailId === null || i.emailId === '') {
            i.message = "emailId required"
            return res.status(400).send(i)
            next(0)
        }
    }

    // console.log(true)
    next()
}

module.exports.validateCatalogue = (req, res, next) => {
    if (req.body.catId === 0) {
        if (req.body.gsName === null || req.body.gsName === '') {
            console.log(true)
            return res.status(400).send({ 'message': "gsName required" })
            next(0)
        }
        if (req.body.price === null || req.body.price === '') {
            return res.status(400).send({ 'message': "price required" })
            next(0)
        }
    }
    next()

}

module.exports.validateQuotation = (req, res, next) => {
    if (req.body.leadId === null || req.body.leadId === 0) {
        console.log(true)
        return res.status(400).send({ 'message': "leadId required" })
        next(0)
    }
    if (req.body.billTo === null || req.body.billTo === '') {
        return res.status(400).send({ 'message': "billTo required" })
        next(0)
    }
    if (req.body.clientPan === null || req.body.clientPan === '') {
        return res.status(400).send({ 'message': "clientPan required" })
        next(0)
    }
    if (req.body.clientEmail === null || req.body.clientEmail === '') {
        return res.status(400).send({ 'message': "clientEmail required" })
        next(0)
    }
    if (req.body.clientContact === null || req.body.clientContact === '') {
        return res.status(400).send({ 'message': "clientContact required" })
        next(0)
    }
    if (req.body.clientAddress === null || req.body.clientAddress === '') {
        return res.status(400).send({ 'message': "clientAddress required" })
        next(0)
    }
    if (req.body.gsCatalogueId === null || req.body.gsCatalogueId === 0) {
        return res.status(400).send({ 'message': "gsCatalogueId required" })
        next(0)
    }
    next()

}

module.exports.validateInvoice = (req, res, next) => {
    if (req.body.leadId === null || req.body.leadId === 0) {
        console.log(true)
        return res.status(400).send({ 'message': "leadId required" })
        next(0)
    }
    if (req.body.billTo === null || req.body.billTo === '') {
        return res.status(400).send({ 'message': "billTo required" })
        next(0)
    }
    if (req.body.clientPan === null || req.body.clientPan === '') {
        return res.status(400).send({ 'message': "clientPan required" })
        next(0)
    }
    if (req.body.clientEmail === null || req.body.clientEmail === '') {
        return res.status(400).send({ 'message': "clientEmail required" })
        next(0)
    }
    if (req.body.clientContact === null || req.body.clientContact === '') {
        return res.status(400).send({ 'message': "clientContact required" })
        next(0)
    }
    if (req.body.clientAddress === null || req.body.clientAddress === '') {
        return res.status(400).send({ 'message': "clientAddress required" })
        next(0)
    }
    if (req.body.gsCatalogueId === null || req.body.gsCatalogueId === 0) {
        return res.status(400).send({ 'message': "gsCatalogueId required" })
        next(0)
    }
    if (req.body.invoiceType === null || req.body.invoiceType === '') {
        return res.status(400).send({ 'message': "invoiceType required" })
        next(0)
    }
    next()

}